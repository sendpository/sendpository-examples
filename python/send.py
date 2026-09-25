"""Send one email with the Sendpository API. Standard library only."""

import json
import os
import sys
import urllib.error
import urllib.request


def load_env(path=".env"):
    """Read KEY=value lines into os.environ, without overriding real env vars."""
    if not os.path.exists(path):
        return
    with open(path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                os.environ.setdefault(key.strip(), value.strip().strip('"'))


def main():
    load_env()
    if len(sys.argv) < 2:
        sys.exit("Usage: python send.py you@example.com")

    base = os.environ.get("SENDPOSITORY_BASE_URL") or "https://api.sendpository.com/v1"
    request = urllib.request.Request(
        f"{base}/emails",
        method="POST",
        headers={
            "Authorization": f"Bearer {os.environ['SENDPOSITORY_API_KEY']}",
            "Content-Type": "application/json",
        },
        data=json.dumps(
            {
                "from": os.environ["SENDPOSITORY_FROM"],
                "to": [sys.argv[1]],
                "subject": "Hello from Sendpository",
                "html": "<p>It works. This email was sent with <strong>one API call</strong>.</p>",
                "text": "It works. This email was sent with one API call.",
            }
        ).encode(),
    )

    try:
        with urllib.request.urlopen(request, timeout=10) as res:
            print(f"Sent. Message id: {json.load(res)['id']}")
    except urllib.error.HTTPError as e:
        error = json.load(e)["error"]
        sys.exit(f"{error['type']}: {error['message']}")


if __name__ == "__main__":
    main()
