using System;
using System.Security.Cryptography;
using System.Text;
using SjclHelpers.Codec;
using System.Linq;
using System.Runtime.CompilerServices;

namespace SjclHelpers.Misc
{
    /// <summary>
    /// An implementation of Password Based Key Derivation Function 2
    /// described in RFC 2898: PKCS #5: Password-Based Cryptography
    /// Specification Version 2.0. The pseudorandom function used in
    /// this implementation is
    /// <see cref="System.Security.Cryptography.HMACSHA256"/>.
    /// </summary>
    /// <remarks>
    /// For more information please visit:
    /// http://www.ietf.org/rfc/rfc2898.txt
    /// </remarks>
    public class PBKDF2HMACSHA256 : DeriveBytes
    {
        /// <summary>
        /// Initializes a new instance of the key derivator with the specified
        /// password, salt and number of iterations to use.
        /// </summary>
        /// <param name="password">
        /// The password to use in the key derivation process.
        /// </param>
        /// <param name="salt">
        /// The salt to use in the key derivation process.
        /// </param>
        /// <param name="iterations">
        /// The number of iterations to use in the key derivation process.
        /// </param>
        public PBKDF2HMACSHA256(byte[] password, byte[] salt, int iterations)
        {
            if (password == null)
            {
                throw new ArgumentNullException("password");
            }
            if (password.Length < 1)
            {
                throw new ArgumentOutOfRangeException("password");
            }
            if (salt == null)
            {
                throw new ArgumentNullException("salt");
            }
            if (salt.Length < 8)
            {
                throw new ArgumentOutOfRangeException("salt");
            }
            if (iterations < 1)
            {
                throw new ArgumentOutOfRangeException("iterations");
            }
            _pseudorandomFunction = new HMACSHA256(password);
            _salt = salt;
            _iterations = iterations;
        }

        private readonly HMACSHA256 _pseudorandomFunction;

        /// <summary>
        /// Get the pseudorandom function.
        /// </summary>
        internal virtual HMACSHA256 PseudorandomFunction
        {
            get { return _pseudorandomFunction; }
        }

        private readonly byte[] _salt;

        /// <summary>
        /// Get the salt.
        /// </summary>
        internal virtual byte[] Salt { get { return _salt; } }

        private readonly int _iterations;

        /// <summary>
        /// Get the number of iterations to use in the key derivation process.
        /// </summary>
        internal virtual int Iterations { get { return _iterations; } }

        /// <summary>
        /// Get or set the index of the next bit of key to fetch.
        /// </summary>
        internal virtual uint IndexOfNextBitOfKeyToFetch { get; set; }

        /// <summary>
        /// Get or set the last computed block.
        /// </summary>
        internal virtual byte[] LastComputedBlock { get; set; }

        /// <summary>
        /// Get a key with the specified key length in bytes.
        /// </summary>
        /// <remarks>
        /// Repeated calls to this method will not generate the same key;
        /// instead, appending two calls of the GetBytes method with a
        /// keyLength parameter value of 20 is the equivalent of calling
        /// the GetBytes method once with a keyLength parameter value of 40.
        /// 
        /// Use the <see cref="Reset"/> method if you want to regenerate
        /// previous bytes.
        /// </remarks>
        /// <param name="keyLength">
        /// The length of the key in bytes. A 256 bit key is 32 bytes.
        /// </param>
        /// <returns>
        /// A key with the specified length.
        /// </returns>
        /// <exception cref="ArgumentOutOfRangeException">
        /// If keyLength is less than 1.
        /// </exception>
        /// <seealso cref="Reset"/>
        public override byte[] GetBytes(int keyLength)
        {
            if (keyLength < 1)
            {
                throw new ArgumentOutOfRangeException("keyLength");
            }
            var currentIndexOfNextBitOfKeyToFetch = IndexOfNextBitOfKeyToFetch;
            if ((keyLength + currentIndexOfNextBitOfKeyToFetch - 1) > 255)
            {
                throw new NotImplementedException(
                    "Support for a total key length of more" +
                    " than 256 bits is not implemented."
                );
            }
            if (currentIndexOfNextBitOfKeyToFetch > 0)
            {
                if (LastComputedBlock == null)
                {
                    throw new InvalidOperationException(
                        "LastComputedBlock may not be null when " +
                        "IndexOfNextBitOfKeyToFetch greater than zero."
                    );
                }
                var bytesToReturn = LastComputedBlock
                    .Skip((int)currentIndexOfNextBitOfKeyToFetch)
                    .Take(keyLength)
                    .ToArray();
                IndexOfNextBitOfKeyToFetch =
                    currentIndexOfNextBitOfKeyToFetch + (uint)keyLength;
                return bytesToReturn;
            }
            IndexOfNextBitOfKeyToFetch = (uint)keyLength;
            var blockToCompute = ConcatSaltAndBlockIndex(1);
            var computedBlock = ComputeBlock(blockToCompute);
            LastComputedBlock = computedBlock;
            return computedBlock.Take(keyLength).ToArray();
        }

        /// <summary>
        /// Concatenates the salt and a block index. 
        /// </summary>
        /// <remarks>
        /// Block index is encoded with four octets
        /// and with the most significant octet first.
        /// </remarks>
        /// <param name="blockIndex">
        /// The block index.
        /// </param>
        /// <returns>
        /// The concatenated salt and block index.
        /// </returns>
        /// <exception cref="ArgumentOutOfRangeException">
        /// If blockIndex is less than 1.
        /// </exception>
        internal virtual byte[] ConcatSaltAndBlockIndex(uint blockIndex)
        {
            if (blockIndex < 1)
            {
                throw new ArgumentOutOfRangeException(
                    "blockIndex",
                    "Parameter blockIndex must be larger than zero."
                );
            }
            var indexBytes = Convert
                .ToString(blockIndex, 16)
                .PadLeft(8, '0')
                .ToBytes();
            var bytes = new byte[Salt.Length + indexBytes.Length];
            Array.Copy(Salt, bytes, Salt.Length);
            Array.Copy(indexBytes, 0, bytes, Salt.Length, indexBytes.Length);
            return bytes;
        }

        /// <summary>
        /// Computes the specified block.
        /// </summary>
        /// <param name="block">
        /// The block to compute.
        /// </param>
        /// <returns>
        /// The computed block.
        /// </returns>
        /// <exception cref="ArgumentNullException">
        /// If block is null.
        /// </exception>
        internal virtual byte[] ComputeBlock(byte[] block)
        {
            if (block == null)
            {
                throw new ArgumentNullException("block");
            }
            var randomizedBlock = Randomize(block);
            var computedBlock = randomizedBlock;
            for (var i = 0; i < Iterations - 1; i++)
            {
                randomizedBlock = Randomize(randomizedBlock);
                computedBlock = computedBlock
                    .Select((b, j) => (byte)(b ^ randomizedBlock[j]))
                    .ToArray();
            }
            return computedBlock;
        }

        /// <summary>
        /// The pseudorandom function.
        /// </summary>
        /// <returns>
        /// The randomized bytes.
        /// </returns>
        internal virtual byte[] Randomize(byte[] block)
        {
            return PseudorandomFunction.ComputeHash(block);
        }

        /// <summary>
        /// Resets the state of the operation.
        /// <seealso cref="GetBytes"/>
        /// </summary>
        public override void Reset()
        {
            IndexOfNextBitOfKeyToFetch = 0;
            LastComputedBlock = null;
        }
    }
}
