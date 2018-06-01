using System;
using System.Text;

namespace SjclHelpers.Misc
{
    public static class PBKDF2HMACSHA256Extensions
    {
        /// <summary>
        /// Derives a key from the specified password using
        /// <see cref="SjclHelpers.Misc.PBKDF2HMACSHA256"/>.
        /// </summary>
        /// <param name="password">
        /// The password.
        /// </param>
        /// <param name="salt">
        /// The salt.
        /// </param>
        /// <param name="iterations">
        /// The numer of iterations to use.
        /// </param>
        /// <param name="keyLength">
        /// Length of derived key in bits. Must be a multiple of eight.
        /// </param>
        /// <returns>
        /// The derived key.
        /// </returns>
        public static byte[] DeriveKey(
            this string password,
            byte[] salt,
            int iterations = 1000,
            int keyLength = 128
        )
        {
            if (salt == null)
            {
                throw new ArgumentNullException("salt");
            }
            if (keyLength == 0 || keyLength % 8 != 0)
            {
                throw new ArgumentOutOfRangeException("keyLength");
            }
            return new PBKDF2HMACSHA256(
                Encoding.UTF8.GetBytes(password),
                salt,
                iterations
            ).GetBytes(keyLength / 8);
        }
    }
}
