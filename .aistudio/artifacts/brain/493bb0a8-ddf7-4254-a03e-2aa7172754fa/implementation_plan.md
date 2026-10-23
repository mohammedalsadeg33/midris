# MedRise — User Profile Avatar & Account Settings

A secure, intuitive profile avatar and account settings system integrated directly into the MedRise navigation, enabling Egyptian medical students to manage their identity, academic affiliation, and credentials.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following product specifications were confirmed during interactive clarification and guide this architecture:

- **Confirmed Avatar Styling**: Circular avatar with student initials rendered over an Egyptian medical teal gradient (`#176B65` to `#1F8880`), bordered with mint highlight (`#A8E6CF`/30) and an online status indicator.
- **Confirmed Avatar Interaction**: Clicking the avatar opens a floating contextual dropdown menu featuring user identity details, quick navigation to **Account Settings**, and one-click **Log Out**.
- **Confirmed Account Settings Scope**: A responsive modal dialog allowing authenticated students to update their **Display Name**, select or enter their **Medical School / Faculty** (e.g., Kasr Al-Ainy, Ain Shams, Mansoura, Alexandria, Assiut), and securely update their **Password**.

---

### 1. Overview & Core Concept

- **What It Does**: Once authenticated, the desktop Navbar and mobile drawer replace the generic account pill with an individualized student avatar. Clicking the avatar displays a clean dropdown menu with direct access to an **Account Settings Modal** and account actions.
- **Target Audience**: Undergraduate medical students, house officers, and clinical interns across Egypt who need quick control over their platform profile and security credentials without leaving their current study workflow.
- **Key Value**: Provides a personalized, professional sense of ownership and privacy control, allowing students to tailor their profile metadata and rotate passwords with zero friction.

---

### 2. User Experience & Visual Design

#### A. Key User Flows
1. **Logged-In Avatar Display**:
   - When authenticated, the Navbar displays a circular 36px avatar with the user's initials (e.g., "MG" for Mohamed Gad, or the first two letters of their email if name is not yet set).
   - A subtle emerald status indicator dot (`bg-emerald-400 ring-2 ring-[#102C3A]`) confirms the active authenticated session.
2. **Contextual Profile Dropdown**:
   - Clicking the avatar toggles an accessible dropdown with smooth entry animation.
   - Header shows full display name, medical school badge, and email address.
   - Menu items:
     - **Account Settings** (opens profile & security modal)
     - **Saved Bookmarks** (triggers bookmarks drawer with counter)
     - **Divider line**
     - **Log Out** (with red accent hover and instant cleanup)
   - Dismisses automatically on outside click, item selection, or `Escape` key press.
3. **Account Settings Modal**:
   - Tabbed or structured modal matching MedRise dark/light palette tokens.
   - **Profile Tab / Section**:
     - *Full Display Name* input.
     - *Medical School / Faculty* dropdown (Kasr Al-Ainy, Ain Shams, Mansoura, Alexandria, Assiut, Al-Azhar, Zagazig, Tanta, Suez Canal, Beni Suef, Minia, Sohag, South Valley, Aswan, or Other).
     - *Academic Stage* selector (Preclinical Y1–Y2, Clinical Y3–Y5, House Officer / Intern).
   - **Security Tab / Section**:
     - *New Password* & *Confirm New Password* fields with minimum 6-character validation.
   - Real-time feedback banners for save success or password mismatch errors.

#### B. Visual Identity & Theme Tokens
- **Theme Support**: Seamlessly reactive to both Light Mode and Dark Mode via existing CSS variables (`--bg-card`, `--border-main`, `--text-main`, `--bg-app`).
- **Avatar Aesthetic**: `bg-gradient-to-br from-[#176B65] to-[#11534E] text-[#A8E6CF] font-bold text-xs shadow-sm`.
- **Dropdown Card**: `bg-white dark:bg-[#102430] border border-slate-200 dark:border-[#1E3D4F] shadow-xl rounded-xl`.
- **Typography**: Plus Jakarta Sans with tabular figures for timestamps and strict zero-pill metadata formatting.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Supabase User Metadata vs. Custom Database Table**
  - *Chosen Approach*: Store student profile attributes (`display_name`, `medical_school`, `academic_stage`) inside Supabase Auth's native `user_metadata` via `supabase.auth.updateUser()`.
  - *Why*: Eliminates the need to create extra Postgres tables or alter database RLS schemas, ensuring instant updates, zero latency, and zero risk to existing database integrity.
  - *Alternatives Considered*: Custom `profiles` table was discarded to adhere to the strict minimal-change principle and prevent schema migration overhead.
- **Decision 2: Dropdown Menu with Modal Elevation**
  - *Chosen Approach*: Keep the dropdown fast and lightweight for navigation, while delegating complex form editing to a dedicated modal dialog.
  - *Why*: Prevents cluttered form inputs inside floating popovers and guarantees 100% accessibility on mobile touch viewports.

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

#### System & Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                              App Root                                  │
│            (ThemeProvider ➔ AuthProvider ➔ MainAppContent)              │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
               ┌────────────────────┴────────────────────┐
               ▼                                         ▼
      ┌─────────────────┐                       ┌──────────────────┐
      │     Navbar      │                       │ AccountSettings  │
      │   (Desktop &    │                       │      Modal       │
      │     Mobile)     │                       │ (Profile & Sec)  │
      └────────┬────────┘                       └────────┬─────────┘
               │                                         │
        ┌──────┴───────────────┐                         │
        ▼                      ▼                         │
┌──────────────┐     ┌──────────────────┐                │
│ User Avatar  │     │ Profile Dropdown │                │
│ (Initials +  │────▶│ (Settings, Saved,│                │
│ Gradient)    │     │     Logout)      │                │
└──────────────┘     └──────────────────┘                │
                               │                         │
                               ▼                         ▼
                    ┌───────────────────────────────────────────┐
                    │          AuthContext (useAuth)            │
                    │   • user & user_metadata                  │
                    │   • updateProfile(name, school, stage)    │
                    │   • updatePassword(newPassword)           │
                    │   • signOut()                             │
                    └─────────────────────┬─────────────────────┘
                                          │
                                          ▼
                             ┌─────────────────────────┐
                             │     Supabase Client     │
                             │ (supabase.auth.update)  │
                             └─────────────────────────┘
```

#### Data Model & State Updates
- **Profile Metadata**:
  ```ts
  interface UserProfileData {
    displayName?: string;
    medicalSchool?: string;
    academicStage?: 'preclinical' | 'clinical' | 'intern' | 'all';
  }
  ```
- **Context Methods**:
  - `updateUserProfile(data: UserProfileData): Promise<{ success: boolean; error?: string }>`
  - `updateUserPassword(newPassword: string): Promise<{ success: boolean; error?: string }>`
- **Avatar Initials Generator**:
  - Extracts first letters of the first and last name from `user_metadata.display_name`.
  - Falls back to the first two characters of `user.email` uppercase if display name is unconfigured.
