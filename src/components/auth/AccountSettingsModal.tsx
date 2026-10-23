import React, { useState, useEffect } from 'react';
import { X, User, Lock, Building2, GraduationCap, CheckCircle2, AlertCircle, Save, KeyRound, ShieldCheck } from 'lucide-react';
import { useAuth, UserProfileData } from '../../context/AuthContext';

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EGYPTIAN_MEDICAL_FACULTIES = [
  'Kasr Al-Ainy (Cairo University)',
  'Ain Shams University Faculty of Medicine',
  'Mansoura University Faculty of Medicine',
  'Alexandria University Faculty of Medicine',
  'Assiut University Faculty of Medicine',
  'Al-Azhar University Faculty of Medicine',
  'Zagazig University Faculty of Medicine',
  'Tanta University Faculty of Medicine',
  'Suez Canal University Faculty of Medicine',
  'Menoufia University Faculty of Medicine',
  'Benha University Faculty of Medicine',
  'Fayoum University Faculty of Medicine',
  'Beni Suef University Faculty of Medicine',
  'Minia University Faculty of Medicine',
  'Sohag University Faculty of Medicine',
  'South Valley University (Qena)',
  'Aswan University Faculty of Medicine',
  'Kafrelsheikh University Faculty of Medicine',
  'Port Said University Faculty of Medicine',
  'Helwan University Faculty of Medicine',
  'Military Medical Academy / AFCM',
  'Other / International Faculty'
];

export const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUserProfile, updateUserPassword } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

  // Profile Form State
  const [displayName, setDisplayName] = useState('');
  const [medicalSchool, setMedicalSchool] = useState('');
  const [academicStage, setAcademicStage] = useState('clinical');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Password Form State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Synchronize initial data when modal opens
  useEffect(() => {
    if (user && isOpen) {
      const meta = user.user_metadata || {};
      setDisplayName(meta.display_name || '');
      setMedicalSchool(meta.medical_school || 'Kasr Al-Ainy (Cairo University)');
      setAcademicStage(meta.academic_stage || 'clinical');
      setProfileMessage(null);
      setPasswordMessage(null);
      setNewPassword('');
      setConfirmPassword('');
    }
  }, [user, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock background scroll when open
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  if (!isOpen || !user) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMessage(null);
    setIsSavingProfile(true);

    const payload: UserProfileData = {
      displayName: displayName.trim(),
      medicalSchool: medicalSchool.trim(),
      academicStage
    };

    const res = await updateUserProfile(payload);
    setIsSavingProfile(false);

    if (res.success) {
      setProfileMessage({ type: 'success', text: 'Profile information updated successfully.' });
    } else {
      setProfileMessage({ type: 'error', text: res.error || 'Failed to update profile.' });
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);

    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'Passwords do not match. Please re-enter confirmation.' });
      return;
    }

    setIsSavingPassword(true);
    const res = await updateUserPassword(newPassword);
    setIsSavingPassword(false);

    if (res.success) {
      setPasswordMessage({ type: 'success', text: 'Your password has been changed successfully.' });
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordMessage({ type: 'error', text: res.error || 'Failed to update password.' });
    }
  };

  // Extract initials for preview
  const getInitials = () => {
    if (displayName.trim()) {
      const parts = displayName.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0].slice(0, 2).toUpperCase();
    }
    if (user.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'MR';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-settings-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#102430] rounded-2xl max-w-xl w-full flex flex-col shadow-2xl border border-slate-200 dark:border-[#1E3D4F] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 dark:border-[#1E3D4F] bg-[#102C3A] dark:bg-[#0A1822] text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#176B65] to-[#11534E] border border-[#A8E6CF]/30 flex items-center justify-center text-[#A8E6CF] font-bold text-sm shadow-xs shrink-0">
              {getInitials()}
            </div>
            <div>
              <h2 id="account-settings-title" className="text-base sm:text-lg font-bold text-white tracking-tight">
                Account Settings
              </h2>
              <p className="text-xs text-slate-300 truncate max-w-[240px] sm:max-w-xs">
                {user.email}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white hover:bg-[#183C4F] rounded-lg transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A8E6CF]"
            aria-label="Close account settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 dark:border-[#1E3D4F] bg-slate-50 dark:bg-[#0D202B]">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center justify-center gap-2 min-h-[44px] cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#176B65] text-[#176B65] dark:text-[#A8E6CF] bg-white dark:bg-[#102430]'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Details</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-colors border-b-2 flex items-center justify-center gap-2 min-h-[44px] cursor-pointer ${
              activeTab === 'security'
                ? 'border-[#176B65] text-[#176B65] dark:text-[#A8E6CF] bg-white dark:bg-[#102430]'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Security & Password</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto max-h-[65vh] space-y-5">
          {/* TAB 1: Profile Details */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              {profileMessage && (
                <div
                  className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                    profileMessage.type === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                      : 'bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                  }`}
                >
                  {profileMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  )}
                  <span className="leading-relaxed font-medium">{profileMessage.text}</span>
                </div>
              )}

              {/* Display Name Input */}
              <div className="space-y-1.5">
                <label htmlFor="settings-display-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Full Display Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="settings-display-name"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Dr. Ahmed Hassan"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-[#0D202B] border border-slate-200 dark:border-[#1E3D4F] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B65] min-h-[44px]"
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Used for personalized resource recommendations and your avatar initials.
                </p>
              </div>

              {/* Medical School Selector */}
              <div className="space-y-1.5">
                <label htmlFor="settings-medical-school" className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Medical School / Faculty (Egypt)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <select
                    id="settings-medical-school"
                    value={medicalSchool}
                    onChange={(e) => setMedicalSchool(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-[#0D202B] border border-slate-200 dark:border-[#1E3D4F] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#176B65] min-h-[44px]"
                  >
                    {EGYPTIAN_MEDICAL_FACULTIES.map((fac) => (
                      <option key={fac} value={fac}>
                        {fac}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Academic Stage Selector */}
              <div className="space-y-1.5">
                <label htmlFor="settings-academic-stage" className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Academic Stage / Level
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <select
                    id="settings-academic-stage"
                    value={academicStage}
                    onChange={(e) => setAcademicStage(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-[#0D202B] border border-slate-200 dark:border-[#1E3D4F] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#176B65] min-h-[44px]"
                  >
                    <option value="preclinical">Preclinical Years (Years 1–2)</option>
                    <option value="clinical">Clinical Clerkship (Years 3–5)</option>
                    <option value="intern">House Officer / Medical Intern</option>
                    <option value="all">Postgraduate / Resident</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSavingProfile}
                  className="w-full py-3 px-4 bg-[#176B65] hover:bg-[#11534E] active:bg-[#0D3E3A] disabled:opacity-60 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center gap-2 min-h-[44px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B65]"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingProfile ? 'Saving profile...' : 'Save Profile Changes'}</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Security & Password */}
          {activeTab === 'security' && (
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              {passwordMessage && (
                <div
                  className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                    passwordMessage.type === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                      : 'bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                  }`}
                >
                  {passwordMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  )}
                  <span className="leading-relaxed font-medium">{passwordMessage.text}</span>
                </div>
              )}

              {/* New Password */}
              <div className="space-y-1.5">
                <label htmlFor="settings-new-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="settings-new-password"
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-[#0D202B] border border-slate-200 dark:border-[#1E3D4F] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B65] min-h-[44px]"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label htmlFor="settings-confirm-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="settings-confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-[#0D202B] border border-slate-200 dark:border-[#1E3D4F] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B65] min-h-[44px]"
                  />
                </div>
              </div>

              {/* Security Hint */}
              <div className="p-3 bg-slate-50 dark:bg-[#0D202B] border border-slate-200 dark:border-[#1E3D4F] rounded-xl text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#176B65] dark:text-[#A8E6CF] shrink-0" />
                <span>
                  Supabase encryption enforces safe salt-hashed storage. Never reuse temporary passwords.
                </span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSavingPassword}
                  className="w-full py-3 px-4 bg-[#176B65] hover:bg-[#11534E] active:bg-[#0D3E3A] disabled:opacity-60 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-sm transition-colors flex items-center justify-center gap-2 min-h-[44px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B65]"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>{isSavingPassword ? 'Updating password...' : 'Update Password'}</span>
                </button>
              </div>
            </form>
          )}

          {/* Account Metadata Summary Box */}
          <div className="pt-4 border-t border-slate-100 dark:border-[#1E3D4F] text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span>Account Status:</span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Medical Student</span>
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span>Email:</span>
              <span className="font-medium text-slate-900 dark:text-slate-200">{user.email}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-[#0A1822] border-t border-slate-100 dark:border-[#1E3D4F] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Protected with Supabase Authentication</span>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-600 dark:text-slate-300 hover:text-[#176B65] dark:hover:text-[#A8E6CF] hover:underline cursor-pointer py-1"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
