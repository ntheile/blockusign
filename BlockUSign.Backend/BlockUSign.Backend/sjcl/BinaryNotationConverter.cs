using System;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace SjclHelpers.Codec
{
    public static class BinaryNotationConverter
    {
        #region bitArray related...

        /// <summary>
        /// Converts the SJCL "bitArray" into hexadecimal notation.
        /// </summary>
        /// <param name="bitArray">
        /// The "bitArray" to convert into hexidecimal notation.
        /// </param>
        /// <returns>
        /// Hexadecimal notation.
        /// </returns>
        public static string ToHex(this int[] bitArray)
        {
            return bitArray.Aggregate(
                new StringBuilder(8),
                (s, n) => s.Append(Convert.ToString(n, 16).PadLeft(8, '0'))
            ).ToString();
        }

        /// <summary>
        /// Converts the SJCL "bitArray" into the bytes it represents.
        /// </summary>
        /// <param name="bitArray">
        /// The "bitArray" to convert into bytes.
        /// </param>
        /// <returns>
        /// The bytes represented by the "bitArray".
        /// </returns>
        public static byte[] ToBytes(this int[] bitArray)
        {
            var hex = bitArray.ToHex();
            return Enumerable
                .Range(0, 32)
                .Select(i => Convert.ToByte(hex.Substring(i * 2, 2), 16))
                .ToArray();
        }

        #endregion

        #region String related...

        /// <summary>
        /// Returns the bytes represented by the hexadecimal notation.
        /// </summary>
        /// <param name="hex">
        /// Hexadecimal notation.
        /// </param>
        /// <returns>
        /// The bytes represented by the hexadecimal notation.
        /// </returns>
        /// <exception cref="ArgumentNullException">
        /// If string is null.
        /// </exception>
        /// <exception cref="ArgumentOutOfRangeException">
        /// If invalid hexadecimal notation.
        /// </exception>
        public static byte[] ToBytes(this string hex)
        {
            if (hex == null)
            {
                throw new ArgumentNullException("hex");
            }
            var outOfRange = hex.Length % 2 == 1 ||
                !Regex.IsMatch(hex.ToLower(), "^[0-9a-f]*$");
            if (outOfRange)
            {
                throw new ArgumentOutOfRangeException(
                    "hex", "Invalid hexadecimal notation."
                );
            }
            return Enumerable
                .Range(0, hex.Length / 2)
                .Select(i => Convert.ToByte(hex.Substring(i * 2, 2), 16))
                .ToArray();
        }

        /// <summary>
        /// Converts hexadecimal notation into Base64 notation.
        /// </summary>
        /// <param name="hex">
        /// Hexadecimal notation.
        /// </param>
        /// <returns>
        /// Base64 notation.
        /// </returns>
        /// <exception cref="ArgumentNullException">
        /// If string is null.
        /// </exception>
        /// <exception cref="ArgumentOutOfRangeException">
        /// If invalid hexadecimal notation.
        /// </exception>
        public static string ToBase64(this string hex)
        {
            return Convert.ToBase64String(hex.ToBytes());
        }

        #endregion

        #region Byte related

        /// <summary>
        /// Converts the bytes into hexadecimal notation.
        /// </summary>
        /// <param name="bytes">
        /// The bytes to convert into hexadecimal notation.
        /// </param>
        /// <returns>
        /// Hexadecimal notation.
        /// </returns>
        public static string ToHex(this byte[] bytes)
        {
            return bytes.Aggregate(
                new StringBuilder(32),
                (s, b) => s.Append(Convert.ToString(b, 16).PadLeft(2, '0'))
            ).ToString();
        }

        #endregion
    }
}
