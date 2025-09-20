'use client';

import { useAuth } from '../../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PrivacySettings from '../../../../components/PrivacySettings';

export default function MyInformationPage() {
  const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({
    name: 'Charlotte Smith',
    email: user?.email || 'charlotte.smith@example.com',
    phone: '+351 123 456 789',
    addresses: ['Rua da Boavista 123, Porto'],
    languages: ['Portuguese', 'English', 'Spanish'],
    joinedDate: 'September 2025',
    membershipLevel: 'Premium'
  });
  // Estado para adicionar mais moradas
  const [newAddress, setNewAddress] = useState('');
  const [isEditingLanguages, setIsEditingLanguages] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
    // Estado para modal de privacidade
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);
    const [privacySettings, setPrivacySettings] = useState({
      showEmail: true,
      showPhone: false,
      allowNotifications: true,
      allowProfileSearch: true
    });
    const [privacySuccess, setPrivacySuccess] = useState('');
  const allLanguages = [
    'Bulgarian', 'Croatian', 'Czech', 'Danish', 'Dutch', 'English', 'Estonian', 'Finnish', 'French',
    'German', 'Greek', 'Hungarian', 'Irish', 'Italian', 'Latvian', 'Lithuanian', 'Maltese', 'Polish',
    'Portuguese', 'Romanian', 'Slovak', 'Slovenian', 'Spanish', 'Swedish'
  ];
  
  // Simulação de dados de reciprocidade
  const [reciprocityData] = useState({
    // Meses que disponibilizou a casa
    providedMonths: ['January', 'February', 'July', 'August'],
    // Meses que usou casas de outros
    usedMonths: ['March', 'April', 'November']
  });

  // Simulação de carregamento de dados
  useEffect(() => {
    // Simular carregamento dos dados do perfil
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Limpar timer em caso de desmontagem do componente
    return () => clearTimeout(timer);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulação de atualização de perfil
    console.log('Profile update requested with:', userProfile);
    // Aqui iria uma chamada API para atualizar o perfil
    alert('Profile updated successfully!');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value
    });
  };

  if (isLoading || authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center p-4 mb-10 bg-white rounded-lg shadow-md backdrop-blur-sm bg-white/90">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <img src="/loguinho.png" alt="HomePass logo" className="w-40 h-auto rounded" />
            </Link>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="font-medium text-slate-900 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1 transition-colors">Dashboard</Link>
            <Link href="/dashboard/my-house" className="font-medium text-slate-900 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 pb-1 transition-colors">My House</Link>
            <Link href="/dashboard/my-information" className="font-medium text-blue-600 border-b-2 border-blue-600 pb-1 hover:text-blue-800 font-semibold transition-colors">My Profile</Link>
            <button
              onClick={logout}
              className="font-medium text-slate-900 hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </nav>
        </header>
        
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Profile summary */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md backdrop-blur-sm bg-white/90 text-slate-900 text-center text-slate-900">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 mx-auto mb-4 flex items-center justify-center shadow-sm">
                <span className="text-3xl text-blue-600 font-medium">{userProfile.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <h2 className="text-xl font-semibold">{userProfile.name}</h2>
              <p className="text-slate-900 mb-3">{userProfile.email}</p>
              <div className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white py-1 px-4 rounded-full text-sm inline-block">
                {userProfile.membershipLevel} Member
              </div>
              <p className="text-sm text-slate-900 mt-3 font-medium">
                Member since {userProfile.joinedDate}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md backdrop-blur-sm bg-white/90 text-slate-900">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-blue-800 font-semibold">Languages</h3>
                <button
                  type="button"
                  className="text-xs px-3 py-1 rounded-full border border-blue-300 bg-blue-50 text-blue-800 font-semibold hover:bg-blue-100 transition-colors"
                  onClick={() => setIsEditingLanguages((prev) => !prev)}
                  aria-label={isEditingLanguages ? 'Cancel editing languages' : 'Edit languages'}
                >
                  {isEditingLanguages ? 'Cancel' : 'Edit'}
                </button>
              </div>
              {!isEditingLanguages ? (
                <div className="flex flex-wrap gap-2">
                  {userProfile.languages.map((lang, index) => (
                    <span 
                      key={index} 
                      className="bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-800 font-medium text-xs px-3 py-1.5 rounded-full border border-emerald-200"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              ) : (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    setIsEditingLanguages(false);
                  }}
                  className="flex flex-wrap gap-2"
                >
                  {allLanguages.map((lang) => (
                    <label key={lang} className="flex items-center gap-1 bg-gradient-to-r from-emerald-50 to-emerald-100 px-2 py-1 rounded-full border border-emerald-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userProfile.languages.includes(lang)}
                        onChange={e => {
                          setUserProfile(prev => ({
                            ...prev,
                            languages: e.target.checked
                              ? [...prev.languages, lang]
                              : prev.languages.filter(l => l !== lang)
                          }));
                        }}
                        className="accent-blue-600"
                      />
                      <span className="text-emerald-800 font-medium text-xs">{lang}</span>
                    </label>
                  ))}
                  <button
                    type="submit"
                    className="ml-2 px-3 py-1 rounded-full border border-blue-300 bg-blue-600 text-white text-xs hover:bg-blue-700 transition-colors"
                  >Save</button>
                </form>
              )}
            </div>
            
            {/* Reciprocity Component */}
            <div className="bg-white p-6 rounded-lg shadow-md backdrop-blur-sm bg-white/90 text-slate-900">
                <h3 className="text-lg font-semibold mb-1 text-blue-800 font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Reciprocity
                </h3>
                <div className="text-sm text-slate-900 font-semibold mb-3 ml-7">Last 12 months</div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-2">Months you provided your home:</p>
                  <div className="flex flex-wrap gap-1">
                    {reciprocityData.providedMonths.map((month, index) => (
                      <span 
                        key={`provided-${index}`} 
                        className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 font-semibold text-xs px-2 py-1 rounded-full border border-blue-300"
                      >
                        {month}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-2">Months you stayed in others' homes:</p>
                  <div className="flex flex-wrap gap-1">
                    {reciprocityData.usedMonths.map((month, index) => (
                      <span 
                        key={`used-${index}`} 
                        className="bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-800 font-medium text-xs px-2 py-1 rounded-full border border-emerald-200"
                      >
                        {month}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-3 text-xs text-slate-900 font-medium">
                  Balance: {reciprocityData.providedMonths.length - reciprocityData.usedMonths.length > 0 ? 
                    <span className="text-emerald-700 font-semibold">+{reciprocityData.providedMonths.length - reciprocityData.usedMonths.length}</span> : 
                    <span className="text-amber-700 font-semibold">{reciprocityData.providedMonths.length - reciprocityData.usedMonths.length}</span>}
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md backdrop-blur-sm bg-white/90 text-slate-900">
              <h3 className="text-lg font-semibold mb-3 text-blue-800 font-semibold text-slate-900">Account Settings</h3>
              <div className="space-y-3">
                <button className="w-full py-2 px-4 text-left bg-blue-100 hover:bg-blue-200 rounded-lg border border-blue-300 transition-colors flex items-center text-slate-900" onClick={() => setShowPasswordModal(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Change Password
                </button>
                {showPasswordModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                      <button className="absolute top-2 right-2 text-gray-400 hover:text-slate-900 text-4xl leading-none" style={{width:'2.5rem',height:'2.5rem'}} onClick={() => {setShowPasswordModal(false); setPasswordError(''); setPasswordSuccess('')}} aria-label="Close">&times;</button>
                      <h3 className="text-lg font-semibold mb-4 text-blue-800 font-semibold">Change Password</h3>
                      <form onSubmit={e => {
                        e.preventDefault();
                        setPasswordError('');
                        setPasswordSuccess('');
                        if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
                          setPasswordError('Please fill in all fields.');
                          return;
                        }
                        if (passwordForm.newPassword.length < 8) {
                          setPasswordError('New password must be at least 8 characters.');
                          return;
                        }
                        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                          setPasswordError('Passwords do not match.');
                          return;
                        }
                        // Chamada à API
                        fetch('/api/account/password', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            email: user?.email,
                            currentPassword: passwordForm.currentPassword,
                            newPassword: passwordForm.newPassword
                          })
                        })
                          .then(async res => {
                            const data = await res.json();
                            if (!res.ok) {
                              setPasswordError(data.error || 'Error changing password.');
                            } else {
                              setPasswordSuccess('Password changed successfully!');
                              setShowPasswordModal(false);
                              setPasswordForm({currentPassword: '', newPassword: '', confirmPassword: ''});
                            }
                          })
                          .catch(() => setPasswordError('Network error.'));
                      }}>
                        <div className="mb-3">
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-slate-900 mb-1">Current Password</label>
                          <input type="password" id="currentPassword" className="w-full px-3 py-2 border border-slate-600 rounded-lg placeholder:text-slate-500 text-slate-900" value={passwordForm.currentPassword} onChange={e => setPasswordForm(f => ({...f, currentPassword: e.target.value}))} required />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="newPassword" className="block text-sm font-medium text-slate-900 mb-1">New Password</label>
                          <input type="password" id="newPassword" className="w-full px-3 py-2 border border-slate-600 rounded-lg placeholder:text-slate-500 text-slate-900" value={passwordForm.newPassword} onChange={e => setPasswordForm(f => ({...f, newPassword: e.target.value}))} required />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-900 mb-1">Confirm New Password</label>
                          <input type="password" id="confirmPassword" className="w-full px-3 py-2 border border-slate-600 rounded-lg placeholder:text-slate-500 text-slate-900" value={passwordForm.confirmPassword} onChange={e => setPasswordForm(f => ({...f, confirmPassword: e.target.value}))} required />
                        </div>
                        {passwordError && <div className="text-red-600 text-sm mb-2">{passwordError}</div>}
                        {passwordSuccess && <div className="text-green-600 text-sm mb-2">{passwordSuccess}</div>}
                        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Change Password</button>
                      </form>
                    </div>
                  </div>
                )}
                <button className="w-full py-2 px-4 text-left bg-blue-100 hover:bg-blue-200 rounded-lg border border-blue-300 transition-colors flex items-center text-slate-900" onClick={() => setShowPrivacyModal(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17a2 2 0 002-2v-2a2 2 0 10-4 0v2a2 2 0 002 2zm6-2v-5a6 6 0 10-12 0v5a2 2 0 002 2h8a2 2 0 002-2z" />
                  </svg>
                  <span className="font-bold text-blue-800 font-semibold">Privacy Settings</span>
                </button>
                {showPrivacyModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                      <button className="absolute top-2 right-2 text-gray-400 hover:text-slate-900 text-4xl leading-none" style={{width:'2.5rem',height:'2.5rem'}} onClick={() => {setShowPrivacyModal(false); setPrivacySuccess('')}} aria-label="Close">&times;</button>
                      <div className="mb-4">
                        {privacySuccess && <div className="text-green-600 text-sm mb-2">{privacySuccess}</div>}
                        <PrivacySettings
                          initialSettings={{
                            exactAddressHidden: true,
                            showNeighborhood: true,
                            showEmail: privacySettings.showEmail,
                            showPhone: privacySettings.showPhone,
                            allowNotifications: privacySettings.allowNotifications,
                            allowProfileSearch: privacySettings.allowProfileSearch,
                          }}
                          onSave={(newSettings) => {
                            setPrivacySettings({
                              showEmail: newSettings.showEmail,
                              showPhone: newSettings.showPhone,
                              allowNotifications: newSettings.allowNotifications,
                              allowProfileSearch: newSettings.allowProfileSearch
                            });
                            setPrivacySuccess('Preferences saved!');
                            setShowPrivacyModal(false);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <button className="w-full py-2 px-4 text-left bg-blue-100 hover:bg-blue-200 rounded-lg border border-blue-300 transition-colors flex items-center text-slate-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Notification Preferences
                </button>
              </div>
            </div>
          </div>

          {/* Right column - Profile form */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md backdrop-blur-sm bg-white/90 text-slate-900">
              <h2 className="text-xl font-semibold mb-4 text-slate-900">Personal Information</h2>
              <form onSubmit={handleUpdateProfile}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={userProfile.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500 text-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userProfile.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 placeholder:text-slate-500 text-slate-900"
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-900 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={userProfile.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500 text-slate-900"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-900 mb-1">
                      Home Addresses
                    </label>
                    <div>
                      {userProfile.addresses.map((address, idx) => (
                        <div key={idx} className="flex items-center gap-2 mb-2">
                          <input
                            type="text"
                            value={address}
                            onChange={e => {
                              const updated = [...userProfile.addresses];
                              updated[idx] = e.target.value;
                              setUserProfile({ ...userProfile, addresses: updated });
                            }}
                            className="w-full px-3 py-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {userProfile.addresses.length > 1 && (
                            <button
                              type="button"
                              className="px-2 py-1 rounded-full border border-red-300 bg-red-50 text-red-700 text-xs hover:bg-red-100 transition-colors"
                              onClick={() => {
                                setUserProfile({
                                  ...userProfile,
                                  addresses: userProfile.addresses.filter((_, i) => i !== idx)
                                });
                              }}
                              aria-label="Remover morada"
                            >Remover</button>
                          )}
                        </div>
                      ))}
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="text"
                          placeholder="Adicionar nova morada"
                          value={newAddress}
                          onChange={e => setNewAddress(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          className="px-3 py-2 rounded-full border border-blue-300 bg-blue-600 text-white text-xs hover:bg-blue-700 transition-colors"
                          onClick={() => {
                            if (newAddress.trim()) {
                              setUserProfile({
                                ...userProfile,
                                addresses: [...userProfile.addresses, newAddress.trim()]
                              });
                              setNewAddress('');
                            }
                          }}
                          aria-label="Adicionar morada"
                        >+</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-600 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
            
            {/* Additional section - Verification status */}
            <div className="bg-white p-6 rounded-lg shadow-md backdrop-blur-sm bg-white/90 text-slate-900 mt-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-900">Account Verification Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex-shrink-0 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-green-800">Email Verified</h3>
                    <p className="text-xs text-green-700">Your email address has been confirmed</p>
                  </div>
                </div>
                <div className="flex items-center p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex-shrink-0 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-green-800">ID Verified</h3>
                    <p className="text-xs text-green-700">Your identity has been verified</p>
                  </div>
                </div>
                <div className="flex items-center p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                  <div className="flex-shrink-0 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">Phone Verification Pending</h3>
                    <p className="text-xs text-yellow-700">Please verify your phone number</p>
                  </div>
                </div>
                <div className="flex items-center p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex-shrink-0 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-green-800">Payment Method Added</h3>
                    <p className="text-xs text-green-700">Your payment method is confirmed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}