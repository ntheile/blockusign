using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;//require reference of System.Runtime.Serialization
using SjclHelpers.Misc;
using MebiusLib;

namespace MebiusLib
{
    class SJCLDecryptor
    {
        private uint[] uint32Key;
        private uint[] uint32IV;
        private uint[] uint32Out;
        private uint[] uint32Tag;
        private uint[] adata;
        private int tagSize;
        private uint[] encKey;//prp
        private uint[] decKey;
        private int ctBitLength;
        /// <summary>
        /// Decrypted message will be here.
        /// </summary>
        public string Plaintext { get; private set; }
        /// <summary>
        /// SJCL decrypt library by mebius.
        /// If you set wrong value, this library may throw exception.
        /// So, using this class inside try-catch statement is recommended.
        /// Don't forget add reference "System.Runtime.Serialization" for parsing JSON data.
        /// </summary>
        /// <remarks>Usage : Create instance and access to Plaintext property. That's all.
        /// This library uses SJCL Helper library by turtur. Thank you for your great library.
        /// PBKDF2HMACSHA256.cs and BinaryNotationConverter.cs are required.
        /// !ATTENTION!
        /// I have not checked with authentication tag other than length 0.
        /// If you want this functionality, you may need to modify sjclCCMComputeTag method and constructor.
        /// </remarks>
        /// <param name="aJson">This parameter must be JSON string.</param>
        /// <param name="aPW">This parameter is string.</param>
        public SJCLDecryptor(string aJson, string aPW)
        {
            DataContractJsonSerializer js = new DataContractJsonSerializer(typeof(SJCLJSON));
            byte[] jsonBytes = Encoding.UTF8.GetBytes(aJson);
            SJCLJSON sjclObj;
            using (MemoryStream ms = new MemoryStream(jsonBytes))
            {
                sjclObj = (SJCLJSON)js.ReadObject(ms);
            }
            sjclObj.init(aPW);
            this.adata = new uint[0];//for now...
            this.tagSize = sjclObj.ts;
            //house data
            this.uint32Key = sjclObj.uintKey;
            this.uint32IV = sjclObj.uintIV;
            this.uint32Out = sjclObj.uintOut;
            this.uint32Tag = sjclObj.uintTag;
            this.ctBitLength = sjclObj.ctBitLength;
            //compute tables...
            this.sjclCipherAes();//gen prp
            /* do the decryption */
            uint[] result = this.sjclDecryptAes();
            //process plaintext
            byte[] plainByte = this.uintToByte(result);
            this.Plaintext = Encoding.UTF8.GetString(plainByte);
        }
        private byte[] uintToByte(uint[] aUint)
        {
            byte[] ret = new byte[(this.ctBitLength - this.tagSize) / 8];//actual byte size
            for (int i = 0, j = 0; i < ret.Length; i++)
            {
                switch (i % 4)
                {
                    case 0:
                        ret[i] = (byte)(aUint[j] >> 24);
                        break;
                    case 1:
                        ret[i] = (byte)(aUint[j] >> 16 & 0xffffffff);
                        break;
                    case 2:
                        ret[i] = (byte)(aUint[j] >> 8 & 0xffffffff);
                        break;
                    case 3:
                        ret[i] = (byte)(aUint[j] & 0xffffffff);
                        j++;
                        break;
                }
            }
            return ret;
        }
        private void sjclCipherAes()
        {

            if (this.uint32Key.Length != 4 && this.uint32Key.Length != 6 && this.uint32Key.Length != 8)
            {
                throw new Exception("Invalid Key Size!!");
            }
            this.encKey = new uint[4 * this.uint32Key.Length + 28];
            Array.Copy(this.uint32Key, 0, this.encKey, 0, this.uint32Key.Length);
            int i;
            uint tmp, rcon = 1;
            uint temp1, temp2, temp3, temp4, r1, r2;
            // schedule encryption keys
            for (i = this.uint32Key.Length; i < 4 * this.uint32Key.Length + 28; i++)
            {
                tmp = this.encKey[i - 1];
                // apply sbox
                if (i % this.uint32Key.Length == 0 || (this.uint32Key.Length == 8 && i % this.uint32Key.Length == 4))
                {
                    temp1 = SJCLAESTables.S[tmp >> 24];
                    temp1 <<= 24;
                    temp2 = SJCLAESTables.S[tmp >> 16 & 255];
                    temp2 <<= 16;
                    temp3 = SJCLAESTables.S[tmp >> 8 & 255];
                    temp3 <<= 8;
                    temp4 = SJCLAESTables.S[tmp & 255];
                    tmp = 0;//reset
                    tmp ^= temp1;
                    tmp ^= temp2;
                    tmp ^= temp3;
                    tmp ^= temp4;
                    // shift rows and add rcon
                    if (i % this.uint32Key.Length == 0)
                    {//reuse variable
                        temp1 = tmp << 8;
                        temp2 = tmp >> 24;
                        tmp = temp1 ^ temp2 ^ rcon << 24;
                        r1 = rcon << 1;
                        r2 = (rcon >> 7) * 283;
                        rcon = r1 ^ r2;
                    }
                }
                this.encKey[i] = this.encKey[i - this.uint32Key.Length] ^ tmp;
            }
            // schedule decryption keys
            this.decKey = new uint[i];
            uint d0, d1, d2, d3;
            for (int j = 0; i != 0; j++, i--)
            {
                tmp = this.encKey[(j & 3) != 0 ? i : i - 4];
                if (i <= 4 || j < 4)
                {
                    this.decKey[j] = tmp;
                }
                else
                {
                    d0 = SJCLAESTables.Tinv0[SJCLAESTables.S[tmp >> 24]];
                    d1 = SJCLAESTables.Tinv1[SJCLAESTables.S[tmp >> 16 & 255]];
                    d2 = SJCLAESTables.Tinv2[SJCLAESTables.S[tmp >> 8 & 255]];
                    d3 = SJCLAESTables.Tinv3[SJCLAESTables.S[tmp & 255]];
                    this.decKey[j] = d0 ^ d1 ^ d2 ^ d3;
                }
            }
        }
        private uint[] sjclDecryptAes()
        {
            int L;
            int ivl = this.sjclBitLength(this.uint32IV) / 8;
            int ol = this.ctBitLength;
            uint[] outX = this.uint32Out;
            uint[] tag = this.uint32Tag;
            ol = (ol - this.tagSize) / 8;//out length (byte)
            if (ivl < 7)
            {
                throw new Exception("IV must be at least 7 bytes");
            }
            // compute the length of the length
            uint olx = (uint)ol;
            for (L = 2; L < 4 && (olx >> 8 * L) != 0; L++)
            {
            }
            if (L < 15 - ivl)
            {
                L = 15 - ivl;
            }
            long[] ivx = this.sjclClampForIV(this.uint32IV, 8 * (15 - L));
            // decrypt
            SJCLResult ret = this.sjclCCMCounterMode(outX, ivx, tag, L);
            // check the tag
            uint[] tag2 = this.sjclCCMComputeTag(ret.Data, ivx, L);
            if (this.sjclEqual(ret.Tag, tag2) == false)
            {
                throw new Exception("tag doesn't match");
            }
            return ret.Data;
        }
        private int sjclBitLength(uint[] aD)
        {
            int l = aD.Length;
            if (l == 0)
            {
                return 0;
            }
            uint x = aD[l - 1];
            int partial = this.sjclGetPartial(x);
            int ret = (l - 1) * 32 + partial;
            return ret;
        }
        private uint[] sjclClamp(uint[] aData, int aLen)//aLen : bit length
        {
            if (aData.Length * 32 < aLen)
            {
                return aData;
            }
            decimal x = (decimal)aLen / 32;
            double a = Math.Ceiling((double)x);
            uint[] newA = new uint[(int)a];
            Array.Copy(aData, 0, newA, 0, newA.Length);
            int l = newA.Length;
            int len = aLen & 31;
            if (l > 0 && len != 0)
            {
                uint shifted = 0x80000000;
                for (int i = 0; i < (len - 1); i++)
                {
                    shifted >>= 1;//shift to right
                    shifted |= 0x80000000;//raise bit
                }
                uint temp = newA[l - 1] & shifted;
                newA[l - 1] = this.sjclPartial(len, temp, 1);
            }
            return newA;
        }
        private long[] sjclClampForIV(uint[] aData, int aLen)//aLen : bit length
        {//convert first
            long[] ret = new long[aData.Length];
            for (int i = 0; i < aData.Length; i++)
            {
                ret[i] = (long)aData[i];
            }
            if (aData.Length * 32 < aLen)
            {
                return ret;
            }
            decimal x = (decimal)aLen / 32;
            double a = Math.Ceiling((double)x);
            uint[] newA = new uint[(int)a];
            Array.Copy(aData, 0, newA, 0, newA.Length);
            int l = newA.Length;
            int len = aLen & 31;
            if (l > 0 && len != 0)
            {
                uint shifted = 0x80000000;
                for (int i = 0; i < (len - 1); i++)
                {
                    shifted >>= 1;//shift to right
                    shifted |= 0x80000000;//raise bit
                }
                uint temp = newA[l - 1] & shifted;
                ret[l - 1] = this.sjclPartialLong(len, temp, 1);
            }
            return ret;
        }
        private uint sjclPartial(int aLen, uint aX, int aEnd)
        {
            if (aLen == 32)
            {
                return aX;
            }
            uint ret;
            if (aEnd != 0)
            {
                ret = aX | 0;
            }
            else
            {
                ret = aX << (32 - aLen);
            }
            long multi = (aLen * 0x10000000000);
            long ret2 = (long)ret + multi;
            long ret3 = ret2 & 0xffffffff;//leave lower 32 bit
            return (uint)ret3;
        }
        private long sjclPartialLong(int aLen, uint aX, int aEnd)
        {
            if (aLen == 32)
            {
                return aX;
            }
            uint ret;
            if (aEnd != 0)
            {
                ret = aX | 0;
            }
            else
            {
                ret = aX << (32 - aLen);
            }
            long multi = (aLen * 0x10000000000);
            long ret2 = (long)ret + multi;
            return ret2;
        }
        private long sjclPartialLong(int aLen, long aX, int aEnd)
        {
            if (aLen == 32)
            {
                return aX;
            }
            long ret;
            if (aEnd != 0)
            {
                ret = aX | 0;
            }
            else
            {
                ret = aX << (32 - aLen);
            }
            long multi = (aLen * 0x10000000000);
            long ret2 = ret + multi;
            return ret2;
        }
        private uint[] sjclShiftRight(uint[] aData, int aShift)
        {
            uint last2 = 0;
            uint carry = 0;//not defined in sjcl
            List<uint> outx = new List<uint>();
            for (; aShift >= 32; aShift -= 32)
            {
                outx.Add(carry);
                carry = 0;
            }
            if (aShift == 0)
            {
                uint[] outy = outx.ToArray();
                uint[] ret = new uint[outy.Length + aData.Length];
                Array.Copy(outy, 0, ret, 0, outy.Length);
                Array.Copy(aData, 0, ret, outy.Length, aData.Length);//merge
                return ret;
            }
            //if shift % 32 != 0
            for (int i = 0; i < aData.Length; i++)
            {
                outx.Add(carry | aData[i] >> aShift);
                carry = aData[i] << (32 - aShift);
            }
            last2 = aData.Length != 0 ? aData[aData.Length - 1] : 0;
            int shift2 = this.sjclGetPartial(last2);
            uint param;
            if (aShift + shift2 > 32)
            {
                param = carry;
            }
            else
            {
                param = outx[outx.Count - 1];
                outx.RemoveAt(outx.Count - 1);//javascript pop
            }
            uint addTemp = this.sjclPartial(aShift + shift2 & 31, param, 1);
            outx.Add(addTemp);
            return outx.ToArray();
        }
        private uint[] sjclShiftRight(uint[] aData, int aShift, uint aCarry, uint[] aOut)
        {
            uint last2 = 0;
            uint carry = aCarry;
            List<uint> outx = new List<uint>();
            for (int i = 0; i < aOut.Length; i++)
            {//copy to List
                outx.Add(aOut[i]);
            }
            for (; aShift >= 32; aShift -= 32)
            {
                outx.Add(carry);
                carry = 0;
            }
            if (aShift == 0)
            {
                uint[] outy = outx.ToArray();
                uint[] ret = new uint[outy.Length + aData.Length];
                Array.Copy(outy, 0, ret, 0, outy.Length);
                Array.Copy(aData, 0, ret, outy.Length, aData.Length);//merge
                return ret;
            }
            //if shift % 32 !=0
            for (int i = 0; i < aData.Length; i++)
            {
                outx.Add(carry | aData[i] >> aShift);
                carry = aData[i] << (32 - aShift);
            }
            last2 = aData.Length != 0 ? aData[aData.Length - 1] : 0;
            int shift2 = this.sjclGetPartial(last2);
            uint param;
            if (aShift + shift2 > 32)
            {
                param = carry;
            }
            else
            {
                param = outx[outx.Count - 1];
                outx.RemoveAt(outx.Count - 1);//javascript pop
            }
            uint addTemp = this.sjclPartial(aShift + shift2 & 31, param, 1);
            outx.Add(addTemp);
            return outx.ToArray();
        }
        private long[] sjclShiftRightLong(long[] aData, int aShift, long aCarry, long[] aOut)
        {//from sjclConcatLong only
            long last2 = 0;
            uint carry = (uint)aCarry;
            List<long> outx = new List<long>();
            for (int i = 0; i < aOut.Length; i++)
            {//copy to list
                outx.Add(aOut[i]);
            }
            for (; aShift >= 32; aShift -= 32)
            {
                outx.Add(carry);
                carry = 0;
            }
            if (aShift == 0)
            {
                long[] outy = outx.ToArray();
                long[] ret = new long[outy.Length + aData.Length];
                Array.Copy(outy, 0, ret, 0, outy.Length);
                Array.Copy(aData, 0, ret, outy.Length, aData.Length);//merge
                return ret;
            }
            //if shift %32 != 0
            for (int i = 0; i < aData.Length; i++)
            {
                outx.Add(carry | aData[i] >> aShift);
                carry = (uint)((aData[i] << (32 - aShift)) & 0xffffffff);
            }
            last2 = aData.Length != 0 ? aData[aData.Length - 1] : 0;
            int shift2 = this.sjclGetPartial(last2);
            long param;
            if (aShift + shift2 > 32)
            {
                param = carry;
            }
            else
            {
                param = outx[outx.Count - 1];
                outx.RemoveAt(outx.Count - 1);//javascript pop
            }
            long addTemp = this.sjclPartialLong(aShift + shift2 & 31, param & 0xffffffff, 1);
            outx.Add(addTemp);
            return outx.ToArray();
        }
        private int sjclGetPartial(uint aData)
        {
            long x = aData / 0x10000000000;
            double ret = Math.Round((double)x);
            return ret > 0 ? (int)ret : 32;
        }
        private int sjclGetPartial(long aData)
        {
            long x = aData / 0x10000000000;
            double ret = Math.Round((double)x);
            return ret > 0 ? (int)ret : 32;
        }
        private SJCLResult sjclCCMCounterMode(uint[] aOut, long[] aIV, uint[] aTag, int aL)
        {
            int bl = this.ctBitLength - this.tagSize;//original data size
            int l = aOut.Length;
            // start the ctr
            long partial = this.sjclPartialLong(8, (uint)(aL - 1), 0);
            long[] partialAr = new long[] { partial };//one object array
            uint[] temp1 = this.sjclConcat(partialAr, aIV);
            uint[] temp2 = new uint[3];//{0,0,0}
            uint[] tempMerge = new uint[temp1.Length + temp2.Length];
            Array.Copy(temp1, 0, tempMerge, 0, temp1.Length);
            Array.Copy(temp2, 0, tempMerge, temp1.Length, temp2.Length);//merge
            uint[] ctr = new uint[4];
            Array.Copy(tempMerge, 0, ctr, 0, ctr.Length);
            // en/decrypt the tag
            uint[] cryptCtr = this.sjclCrypt(ctr, false);
            uint[] tag = this.sjclXOR4(aTag, cryptCtr);
            // en/decrypt the data
            if (l == 0)
            {//data size is 0
                return new SJCLResult(tag, new uint[0]);
            }
            uint[] enc;
            uint[] aoutx = new uint[aOut.Length + 3];
            Array.Copy(aOut, 0, aoutx, 0, aOut.Length);//extend
            for (int i = 0; i < l; i += 4)
            {
                ctr[3]++;
                enc = this.sjclCrypt(ctr, false);
                aoutx[i] ^= enc[0];
                aoutx[i + 1] ^= enc[1];
                aoutx[i + 2] ^= enc[2];
                aoutx[i + 3] ^= enc[3];
            }
            SJCLResult ret = new SJCLResult(tag, this.sjclClamp(aoutx, bl));
            return ret;
        }
        private uint[] sjclConcat(uint[] aD1, uint[] aD2)
        {
            if (aD1.Length == 0 || aD2.Length == 0)
            {
                uint[] ret = new uint[aD1.Length + aD2.Length];
                Array.Copy(aD1, 0, ret, 0, aD1.Length);
                Array.Copy(aD2, 0, ret, aD1.Length, aD2.Length);//merge
                return ret;
            }
            uint last = aD1[aD1.Length - 1];
            int shift = this.sjclGetPartial(last);
            if (shift == 32)
            {
                uint[] ret = new uint[aD1.Length + aD2.Length];
                Array.Copy(aD1, 0, ret, 0, aD1.Length);
                Array.Copy(aD2, 0, ret, aD1.Length, aD2.Length);//merge
                return ret;
            }
            else
            {
                uint[] d1y = new uint[aD1.Length - 1];
                for (int i = 0; i < d1y.Length; i++)
                {
                    d1y[i] = aD1[i];
                }
                uint[] ret = this.sjclShiftRight(aD2, shift, last | 0, d1y);
                return ret;
            }
        }
        private uint[] sjclConcat(uint[] aD1, long[] aD2)
        {//convert first
            uint[] d2x = new uint[aD2.Length];
            for (int i = 0; i < aD2.Length; i++)
            {//stupidly honesty code...
                d2x[i] = (uint)(aD2[i] & 0xffffffff);
            }
            if (aD1.Length == 0 || aD2.Length == 0)
            {
                uint[] ret = new uint[aD1.Length + aD2.Length];
                Array.Copy(aD1, 0, ret, 0, aD1.Length);
                Array.Copy(d2x, 0, ret, aD1.Length, d2x.Length);//merge
                return ret;
            }
            uint last = aD1[aD1.Length - 1];
            int shift = this.sjclGetPartial(last);
            if (shift == 32)
            {
                uint[] ret = new uint[aD1.Length + aD2.Length];
                Array.Copy(aD1, 0, ret, 0, aD1.Length);
                Array.Copy(d2x, 0, ret, aD1.Length, d2x.Length);//merge
                return ret;
            }
            else
            {
                uint[] d1y = new uint[aD1.Length - 1];
                for (int i = 0; i < d1y.Length; i++)
                {
                    d1y[i] = aD1[i];
                }
                uint[] ret = this.sjclShiftRight(d2x, shift, last | 0, d1y);
                return ret;
            }
        }
        private uint[] sjclConcat(long[] aD1, long[] aD2)
        {//from sjclCCMCounterMode only
            //convert first
            uint[] d1x = new uint[aD1.Length];
            uint[] d2x = new uint[aD2.Length];
            for (int i = 0; i < aD1.Length; i++)
            {
                d1x[i] = (uint)(aD1[i] & 0xffffffff);
            }
            for (int i = 0; i < aD2.Length; i++)
            {
                d2x[i] = (uint)(aD2[i] & 0xffffffff);
            }
            if (aD1.Length == 0 || aD2.Length == 0)
            {
                uint[] ret = new uint[d1x.Length + d2x.Length];
                Array.Copy(d1x, 0, ret, 0, d1x.Length);
                Array.Copy(d2x, 0, ret, d1x.Length, d2x.Length);//merge
                return ret;
            }
            long last = aD1[aD1.Length - 1];//use original variable
            int shift = this.sjclGetPartial(last);
            if (shift == 32)
            {
                uint[] ret = new uint[d1x.Length + d2x.Length];
                Array.Copy(d1x, 0, ret, 0, d1x.Length);
                Array.Copy(d2x, 0, ret, d1x.Length, d2x.Length);//merge
                return ret;
            }
            else
            {
                last &= 0xffffffff;//leave lower 32 bit
                uint[] d1y = new uint[d1x.Length - 1];
                for (int i = 0; i < d1y.Length; i++)
                {
                    d1y[i] = d1x[i];
                }
                uint[] ret = this.sjclShiftRight(d2x, shift, (uint)last | 0, d1y);
                return ret;
            }
        }
        private long[] sjclConcatLong(long[] aD1, long[] aD2)
        {//from sjclCCMComputeTag only
            //convert first
            if (aD1.Length == 0 || aD2.Length == 0)
            {
                long[] ret = new long[aD1.Length + aD2.Length];
                Array.Copy(aD1, 0, ret, 0, aD1.Length);
                Array.Copy(aD2, 0, ret, aD1.Length, aD2.Length);//merge
                return ret;
            }
            long last = aD1[aD1.Length - 1];
            int shift = this.sjclGetPartial(last);
            if (shift == 32)
            {
                long[] ret = new long[aD1.Length + aD2.Length];
                Array.Copy(aD1, 0, ret, 0, aD1.Length);
                Array.Copy(aD2, 0, ret, aD1.Length, aD2.Length);//merge
                return ret;
            }
            else
            {
                last &= 0xffffffff;//leave lower 32 bit
                long[] d1y = new long[aD1.Length - 1];
                for (int i = 0; i < d1y.Length; i++)
                {//javascript slice
                    d1y[i] = aD1[i];
                }
                long[] ret = this.sjclShiftRightLong(aD2, shift, last | 0, d1y);
                return ret;
            }
        }
        private uint[] sjclCrypt(uint[] aCtr, bool aIsDecrypt)
        {//sjcl crypto core
            if (aCtr.Length != 4)
            {
                throw new Exception("invalid aes block size");
            }
            uint[] key = aIsDecrypt == true ? this.decKey : this.encKey;
            uint a = aCtr[0] ^ key[0];
            uint b = aCtr[aIsDecrypt ? 3 : 1] ^ key[1];
            uint c = aCtr[2] ^ key[2];
            uint d = aCtr[aIsDecrypt ? 1 : 3] ^ key[3];
            int nInnerRounds = key.Length / 4 - 2;
            int kIndex = 4;
            uint[] outx = new uint[4];//[0,0,0,0]
            // load up the tables
            uint[] t0, t1, t2, t3;
            byte[] sbox;
            if (aIsDecrypt == true)
            {
                t0 = SJCLAESTables.Tinv0;
                t1 = SJCLAESTables.Tinv1;
                t2 = SJCLAESTables.Tinv2;
                t3 = SJCLAESTables.Tinv3;
                sbox = SJCLAESTables.Si;
            }
            else
            {
                t0 = SJCLAESTables.T0;
                t1 = SJCLAESTables.T1;
                t2 = SJCLAESTables.T2;
                t3 = SJCLAESTables.T3;
                sbox = SJCLAESTables.S;
            }
            // Inner rounds.  Cribbed from OpenSSL.
            uint a2, b2, c2;
            for (int i = 0; i < nInnerRounds; i++)
            {
                a2 = t0[a >> 24] ^ t1[b >> 16 & 255] ^ t2[c >> 8 & 255] ^ t3[d & 255] ^ key[kIndex];
                b2 = t0[b >> 24] ^ t1[c >> 16 & 255] ^ t2[d >> 8 & 255] ^ t3[a & 255] ^ key[kIndex + 1];
                c2 = t0[c >> 24] ^ t1[d >> 16 & 255] ^ t2[a >> 8 & 255] ^ t3[b & 255] ^ key[kIndex + 2];
                d = t0[d >> 24] ^ t1[a >> 16 & 255] ^ t2[b >> 8 & 255] ^ t3[c & 255] ^ key[kIndex + 3];
                kIndex += 4;
                a = a2;
                b = b2;
                c = c2;
            }
            // Last round.
            uint temp1, temp2, temp3, temp4, temp5;
            for (int i = 0; i < 4; i++)
            {
                temp1 = (uint)sbox[a >> 24];
                temp1 <<= 24;
                temp2 = (uint)sbox[b >> 16 & 255];
                temp2 <<= 16;
                temp3 = (uint)sbox[c >> 8 & 255];
                temp3 <<= 8;
                temp4 = (uint)sbox[d & 255];
                temp5 = key[kIndex++];
                outx[aIsDecrypt ? 3 & -i : i] = temp1 ^ temp2 ^ temp3 ^ temp4 ^ temp5;
                a2 = a;
                a = b;
                b = c;
                c = d;
                d = a2;
            }
            return outx;
        }
        private uint[] sjclXOR4(uint[] aTag, uint[] aCtr)
        {
            uint[] ret = new uint[aTag.Length];
            for (int i = 0; i < ret.Length; i++)
            {
                ret[i] = aTag[i] ^ aCtr[i];
            }
            return ret;
        }
        private uint[] sjclCCMComputeTag(uint[] aData, long[] aIV, int aL)
        {// compute B[0]
            int tlen = this.tagSize / 8;
            // check tag length and message length
            if (tlen % 2 != 0 || tlen < 4 || tlen > 16)
            {
                throw new Exception("invalid tag length");
            }
            if ((double)this.adata.Length > 0xFFFFFFFF || (double)aData.Length > 0xFFFFFFFF)
            {// I don't want to deal with extracting high words from doubles.
                throw new Exception("can't deal with 4GiB or more data");
            }
            // mac the flags
            int p1 = (this.adata.Length != 0 ? 1 << 6 : 0);
            int p2 = (tlen - 2) << 2;
            int p3 = aL - 1;
            int temp0 = p1 | p2 | p3;
            long[] mac = new long[1];
            mac[0] = this.sjclPartialLong(8, (uint)temp0, 0);
            // mac the iv and length
            long[] mac2 = this.sjclConcatLong(mac, aIV);
            mac2[3] |= (uint)((this.ctBitLength - this.tagSize) / 8);
            uint[] mac2a = new uint[mac2.Length];
            for (int i = 0; i < mac2.Length; i++)
            {
                mac2a[i] = (uint)(mac2[i] & 0xffffffff);
            }
            uint[] mac3 = this.sjclCrypt(mac2a, false);
            if (this.adata.Length != 0)
            {// mac the associated data.  start with its length...
                int tmp = this.sjclBitLength(this.adata) / 8;
                List<uint> macDataList = new List<uint>();
                if (tmp <= 0xFEFF)
                {
                    uint md = this.sjclPartial(16, (uint)tmp, 0);
                    //macData = new uint[] { md };
                    macDataList.Add(md);
                }
                else if ((double)tmp <= 0xFFFFFFFF)
                {
                    uint md0 = this.sjclPartial(16, 0xFFFE, 0);
                    uint[] md1 = new uint[] { md0 };
                    uint[] md2 = new uint[] { (uint)tmp };
                    uint[] macTemp = this.sjclConcat(md1, md2);
                    for (int i = 0; i < macTemp.Length; i++)
                    {
                        macDataList.Add(macTemp[i]);
                    }
                }// else ...???
                uint[] macData = macDataList.ToArray();
                // mac the data itself
                uint[] macData2 = this.sjclConcat(macData, this.adata);
                for (int i = 0; i < macData2.Length; i++)
                {//use mac3
                    uint[] param0 = new uint[7];//{macData2, 0,0,0}
                    Array.Copy(macData2, i, param0, 0, 4);
                    uint[] xorMac = this.sjclXOR4(mac3, param0);
                    mac3 = this.sjclCrypt(xorMac, false);
                }
            }
            // mac the plaintext
            //make extended aData
            uint[] datax = new uint[aData.Length + 4];
            Array.Copy(aData, 0, datax, 0, aData.Length);
            for (int i = 0; i < aData.Length; i += 4)
            {//use mac3
                uint[] param0 = new uint[7];
                Array.Copy(datax, i, param0, 0, 4);
                uint[] xorMac = this.sjclXOR4(mac3, param0);
                mac3 = this.sjclCrypt(xorMac, false);
            }
            uint[] ret = this.sjclClamp(mac3, this.tagSize);//tlen * 8
            return ret;
        }
        private bool sjclEqual(uint[] aX, uint[] aY)
        {
            if (this.sjclBitLength(aX) != this.sjclBitLength(aY))
            {
                return false;
            }
            uint x = 0;
            for (int i = 0; i < aX.Length; i++)
            {
                x |= aX[i] ^ aY[i];
            }
            return x == 0;
        }
        private class SJCLResult
        {//Mini Class
            public uint[] Tag { get; private set; }
            public uint[] Data { get; private set; }
            public SJCLResult(uint[] aTag, uint[] aData)
            {
                this.Tag = aTag;
                this.Data = aData;
            }
        }
        [DataContract]
        private class SJCLJSON
        {
            [DataMember]
            public string iv { get; set; }
            [DataMember]
            public int iter { get; set; }
            [DataMember]
            public int ks { get; set; }
            [DataMember]
            public int ts { get; set; }
            [DataMember]
            public string salt { get; set; }
            [DataMember]
            public string ct { get; set; }
            public uint[] uintIV { get; private set; }
            public uint[] uintKey { get; private set; }
            public uint[] uintOut { get; private set; }
            public uint[] uintTag { get; private set; }
            public int ctBitLength { get; private set; }
            public void init(string aPW)
            {
                this.iv = this.addEqual(this.iv);
                this.salt = this.addEqual(this.salt);
                this.ct = this.addEqual(this.ct);
                byte[] byteCT = Convert.FromBase64String(this.ct);
                byte[] byteIV = Convert.FromBase64String(this.iv);
                this.ctBitLength = byteCT.Length * 8;
                this.checkParam();
                byte[] byteKey = this.genKeyBytes(aPW);
                this.uintIV = this.byteToUint(byteIV);
                this.uintKey = this.byteToUint(byteKey);
                //divide CT
                byte[] byteOut = new byte[(this.ctBitLength - this.ts) / 8];
                byte[] byteTag = new byte[this.ts / 8];
                for (int i = 0; i < byteOut.Length; i++)
                {//copy front
                    byteOut[i] = byteCT[i];
                }
                for (int i = 0, j = (this.ctBitLength - this.ts) / 8; i < byteTag.Length; i++, j++)
                {//copy back
                    byteTag[i] = byteCT[j];
                }
                this.uintOut = this.byteToUint(byteOut);
                this.uintTag = this.byteToUint(byteTag);
            }
            private void checkParam()
            {
                if (this.ks != 128 && this.ks != 192 && this.ks != 256)
                {
                    throw new Exception("Invalid Key Size");
                }
                if (this.ts != 64 && this.ts != 96 && this.ts != 128)
                {
                    throw new Exception("Invalid Tag Size");
                }
                if (this.iter <= 100)
                {
                    throw new Exception("Iterator is too small");
                }
                if (this.ctBitLength < this.ts)
                {
                    throw new Exception("Invalid Data : CipherText is shorter than tag size");
                }
            }
            private string addEqual(string aStr)
            {
                int a = aStr.Length % 4;
                if (a != 0)
                {
                    for (int i = 0; i < 4 - a; i++)
                    {
                        aStr += "=";
                    }
                }
                return aStr;
            }
            private uint[] byteToUint(byte[] aByte)
            {
                int newArrayLength = (int)Math.Ceiling((double)(aByte.Length) / 4);//ceil
                uint[] ret = new uint[newArrayLength];
                for (int i = 0, r = 0; i < aByte.Length; i++)
                {
                    uint a = 0;
                    switch (i % 4)
                    {
                        case 0:
                            a = (uint)aByte[i] << 24;
                            ret[r] |= a;
                            break;
                        case 1:
                            a = (uint)aByte[i] << 16;
                            ret[r] |= a;
                            break;
                        case 2:
                            a = (uint)aByte[i] << 8;
                            ret[r] |= a;
                            break;
                        case 3:
                            a = (uint)aByte[i];
                            ret[r] |= a;
                            r++;
                            break;
                    }
                }
                return ret;
            }
            private byte[] genKeyBytes(string aPW)
            {
                byte[] pw = Encoding.UTF8.GetBytes(aPW);
                byte[] saltByte = Convert.FromBase64String(this.salt);
                PBKDF2HMACSHA256 k = new PBKDF2HMACSHA256(pw, saltByte, this.iter);
                return k.GetBytes(this.ks / 8);
            }
        }
    }
}