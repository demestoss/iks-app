const MillionLint = require('@million/lint');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

module.exports = MillionLint.next({ rsc: true })(nextConfig);
