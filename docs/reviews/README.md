# Review history

This directory is the durable record for project reviews performed by Codex or Antigravity.

## Rules

1. Create one folder per review: `YYYY-MM-DD-<scope>-<short-id>/`.
2. Every review folder must contain `review.md` with the scope, commit/diff baseline, runtime URL, viewport/device, reviewer, date, findings, and final status.
3. Save visual evidence under `screenshots/` whenever screenshots were captured. Keep the original viewport and use stable names such as `home-desktop.png`, `home-mobile.png`, or `booking-step-02.png`.
4. Save extracted visible copy, labels, and accessibility/DOM notes under `text/` when they are part of the review. Do not store secrets, private customer data, tokens, or credentials.
5. Add the review to `INDEX.md` and record every later change in the review's `updates.md`.
6. A later review should start from the latest recorded baseline and inspect only changed or affected areas. Run a full review again only when the change affects shared layout, navigation, global styles, data contracts, or the user explicitly asks for a full review.
7. If an artifact cannot be captured, record the exact reason in `review.md` instead of claiming it exists.

## Review status

Use one of: `baseline`, `follow-up`, `passed`, `passed-with-notes`, `blocked`, or `superseded`.

## Suggested folder layout

```text
docs/reviews/
  INDEX.md
  README.md
  2026-08-13-home-baseline-a1b2/
    review.md
    updates.md
    screenshots/
    text/
```
