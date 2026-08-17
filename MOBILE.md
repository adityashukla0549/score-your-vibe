# Rate My Life — native mobile app (iOS + Android)

The app is now Capacitor-ready. Native builds must run on your own machine.

## One-time setup

1. Export the project to GitHub ("Export to GitHub" button in Lovable), then `git clone` it.
2. `npm install`
3. Add platforms:
   - iOS (needs a Mac + Xcode): `npx cap add ios`
   - Android (needs Android Studio): `npx cap add android`
4. Build the web assets: `npm run build`
5. Sync: `npx cap sync`

## Run it

- `npx cap run ios` (or open in Xcode: `npx cap open ios`)
- `npx cap run android` (or `npx cap open android`)

## Hot reload vs. store build

`capacitor.config.ts` currently points `server.url` at the live Lovable preview, so the
native app always shows the latest version without rebuilding.

**Before submitting to the App Store / Play Store**, delete the whole `server` block,
then run `npm run build && npx cap sync` so the app ships its own bundled assets.

## After every code change

`git pull` → `npm run build` → `npx cap sync`

## Store assets

Add app icons and splash screens with `@capacitor/assets`:
`npx @capacitor/assets generate --iconBackgroundColor "#14131a" --splashBackgroundColor "#14131a"`
(place a 1024x1024 `assets/icon.png` first)
