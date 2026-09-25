#!/usr/bin/env bash
# Usage: expect.sh <command...>
# Runs an example twice against the mock API: once with a good key (must print
# the message id) and once with a bad key (must fail with authentication_error).
set -uo pipefail

out=$("$@" you@example.com 2>&1)
echo "$out"
grep -q "Sent. Message id: d67e39ed" <<<"$out" || { echo "::error::expected a message id"; exit 1; }

bad=$(SENDPOSITORY_API_KEY=wrong "$@" you@example.com 2>&1) && { echo "::error::a bad key should fail"; exit 1; }
echo "$bad"
grep -q "authentication_error" <<<"$bad" || { echo "::error::expected authentication_error"; exit 1; }
echo "ok"
