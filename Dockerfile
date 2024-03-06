FROM node:alpine AS builder

# Install necessary packages
RUN apk add make unzip curl
# The '•' character is replaced with a space and '--no-cache' is corrected
RUN apk --no-cache add ca-certificates wget

# Correct the command to download the public key for verifying glibc package
RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub

# Download and install glibc package (corrected the URL and command syntax)
RUN wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk
RUN apk add --no-cache --force-overwrite glibc-2.28-r0.apk

# Install bun package manager
RUN npm install -g bun

# Corrected WORKDIR command (KORKDIR -> WORKDIR)
WORKDIR /build
ENV NODE_ENV production
# Copy package.json and bun.lockb (assuming bun.lockb is correct, otherwise it should be bun.lock)
COPY package.json package.json
COPY bun.lockb bun.lockb
# Install dependencies with bun
RUN bun install

# Copy the rest of the application
COPY . .
FROM oven/bun:1
COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/index.mjs ./index.mjs


# RUN npx playwright install firefox
CMD ["bun", "index.ts"]