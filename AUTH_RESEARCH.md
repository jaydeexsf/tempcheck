# TempCheck Authentication Research and Design Notes

## Objective

Replace the original simulated login and signup cards with a clearer, more credible authentication experience for a developer-focused email intelligence product.

The implementation goal is a polished prototype flow, not a claim that production authentication is already connected.

## Online references reviewed

### Vercel login

URL: https://vercel.com/login

Useful patterns:

- One focused authentication task per screen.
- Clear separation between the primary form and account switching.
- Short supporting copy and low visual noise.
- Social sign-in options are presented as explicit alternatives when they are genuinely available.

### Linear

URL: https://linear.app

Useful patterns:

- Strong product-specific visual identity instead of generic stock imagery.
- Restrained typography, dark surfaces, thin borders, and precise accent color.
- Product value is communicated in one strong sentence before secondary detail.

### Clerk authentication examples

URL: https://clerk.com/docs/customization/elements/examples/sign-in

Useful patterns:

- Labels remain visible and accessible instead of relying only on placeholders.
- Focus and validation states are explicit.
- Sign-in and sign-up flows expose clear links between the two states.
- Verification and error states should be treated as first-class screens when real authentication is connected.

Note: The specific Clerk examples were marked deprecated in the fetched documentation, so Clerk was not added as a dependency.

## Design decisions for this project

### Split-screen layout

The left side introduces the product with the existing `cyber-envelope-shield.png` asset. This keeps the authentication page connected to TempCheck's core promise: protecting signup quality.

The right side contains the form. On smaller screens the layout stacks vertically, with the form remaining easy to reach and the visual becoming a compact introduction.

### Shared component

Login and signup now use `src/components/auth/AuthExperience.tsx`. This prevents the two screens from drifting apart and makes the switch between them predictable.

### Form behavior

- Login and signup remain separate routes: `/login` and `/signup`.
- The active route is reflected in the account switcher.
- Password visibility can be toggled.
- Native browser validation is retained for email, required fields, and minimum password length.
- Signup requires agreement to the Terms and Privacy Policy.
- Submission displays a short loading state.
- Successful submission redirects to `/coming-soon`.

### Coming-soon destination

The new `/coming-soon` route intentionally says that the workspace is coming soon. This matches the requested product state while making the future dashboard destination explicit.

## Important production follow-up

The current flow is still a frontend prototype. It does not create sessions, hash passwords, send email verification, or connect to an identity provider.

Before launch, connect the form to a real authentication system and add:

1. Server-side validation and rate limiting.
2. Secure password hashing or a managed identity provider.
3. Email verification and password recovery.
4. Session cookies with secure, HTTP-only settings.
5. OAuth only after provider credentials and callback routes exist.
6. Redirect protection for `/dashboard` and `/dashboard/keys`.
7. Clear API-key issuance rules and one-time secret display.
8. Audit logging for sign-ins, key creation, and key revocation.
9. Accessible error messages for invalid credentials and locked accounts.
10. Tests for successful, failed, interrupted, and expired authentication flows.

## Why Tailwind was not added

The repository does not currently contain Tailwind configuration or Tailwind dependencies. The new screens use the existing global CSS system instead of adding a second styling system just for authentication. This keeps the change smaller and avoids build and design-token duplication.
