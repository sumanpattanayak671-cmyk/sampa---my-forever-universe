import React, { useState, useEffect } from 'react';
import {
  Shield, KeyRound, Lock, Image as ImageIcon, BookOpen, Heart, Award,
  Compass, Music, Settings, Download, Upload, Trash2, Plus, Edit2, Check,
  AlertCircle, RefreshCw, LogOut, Eye, EyeOff, Sparkles, Folder, ExternalLink
} from 'lucide-react';
import {
  UniverseData, Photo, Memory, LoveLetter, Reason, PromiseItem, FuturePlan,
  MusicTrack, SecretRoomData, SiteSettings
} from '../types';

interface AdminViewProps {
  onDataUpdated: () => void;
  navigate: (path: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onDataUpdated, navigate }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('admin_token'));
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active admin tab
  const [activeTab, setActiveTab] = useState<
    'photos' | 'memories' | 'letters' | 'reasons' | 'promises' | 'plans' | 'music' | 'secret' | 'settings' | 'backup'
  >('photos');

  // Loaded full admin data
  const [adminData, setAdminData] = useState<{ universe: UniverseData; secretRoom: SecretRoomData } | null>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Modals / forms states
  const [editingPhoto, setEditingPhoto] = useState<Partial<Photo> | null>(null);
  const [editingMemory, setEditingMemory] = useState<Partial<Memory> | null>(null);
  const [editingLetter, setEditingLetter] = useState<Partial<LoveLetter> | null>(null);
  const [editingReason, setEditingReason] = useState<Partial<Reason> | null>(null);
  const [editingPromise, setEditingPromise] = useState<Partial<PromiseItem> | null>(null);
  const [editingPlan, setEditingPlan] = useState<Partial<FuturePlan> | null>(null);
  const [editingTrack, setEditingTrack] = useState<Partial<MusicTrack> | null>(null);

  // Change password form
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [pwMessage, setPwMessage] = useState<string | null>(null);

  // Upload photo state
  const [uploadingFile, setUploadingFile] = useState(false);

  const showNotification = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3500);
  };

  const fetchAdminData = async (authToken: string) => {
    setLoadingData(true);
    try {
      const res = await fetch('/api/admin/data', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.status === 401) {
        setToken(null);
        localStorage.removeItem('admin_token');
        return;
      }
      const data = await res.json();
      setAdminData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAdminData(token);
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setLoginError(data.error || 'Invalid credentials');
      } else {
        localStorage.setItem('admin_token', data.token);
        setToken(data.token);
        setLoginPassword('');
      }
    } catch (err) {
      setLoginError('Server connection error. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    if (token) {
      fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    setToken(null);
    localStorage.removeItem('admin_token');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetCallback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size < 15MB
    if (file.size > 15 * 1024 * 1024) {
      alert('File size exceeds 15MB. Please choose a smaller photo.');
      return;
    }

    setUploadingFile(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = reader.result as string;
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ imageBase64: base64, filename: file.name }),
        });
        const data = await res.json();
        if (data.success) {
          targetCallback(data.url);
          showNotification('Photograph uploaded successfully!');
        } else {
          alert(data.error || 'Upload failed');
        }
      } catch (err) {
        alert('Network error during upload');
      } finally {
        setUploadingFile(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // ----------------- CRUD HANDLERS ----------------- //

  const savePhoto = async () => {
    if (!editingPhoto || !editingPhoto.url || !editingPhoto.title) {
      alert('Title and Photo URL or File are required');
      return;
    }
    const res = await fetch('/api/admin/photo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(editingPhoto),
    });
    if (res.ok) {
      showNotification('Photo saved successfully');
      setEditingPhoto(null);
      fetchAdminData(token!);
      onDataUpdated();
    }
  };

  const deletePhoto = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photograph?')) return;
    const res = await fetch(`/api/admin/photo/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      showNotification('Photo deleted');
      fetchAdminData(token!);
      onDataUpdated();
    }
  };

  const saveMemory = async () => {
    if (!editingMemory || !editingMemory.title || !editingMemory.description) {
      alert('Title and Description are required');
      return;
    }
    const res = await fetch('/api/admin/memory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(editingMemory),
    });
    if (res.ok) {
      showNotification('Memory saved successfully');
      setEditingMemory(null);
      fetchAdminData(token!);
      onDataUpdated();
    }
  };

  const deleteMemory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this memory?')) return;
    const res = await fetch(`/api/admin/memory/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      showNotification('Memory deleted');
      fetchAdminData(token!);
      onDataUpdated();
    }
  };

  const saveLetter = async () => {
    if (!editingLetter || !editingLetter.title || !editingLetter.content) {
      alert('Title and Content are required');
      return;
    }
    const res = await fetch('/api/admin/letter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(editingLetter),
    });
    if (res.ok) {
      showNotification('Love letter saved');
      setEditingLetter(null);
      fetchAdminData(token!);
      onDataUpdated();
    }
  };

  const deleteLetter = async (id: string) => {
    if (!confirm('Are you sure you want to delete this letter?')) return;
    const res = await fetch(`/api/admin/letter/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      showNotification('Letter deleted');
      fetchAdminData(token!);
      onDataUpdated();
    }
  };

  const saveReason = async () => {
    if (!editingReason || !editingReason.title) return;
    const res = await fetch('/api/admin/reason', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(editingReason),
    });
    if (res.ok) {
      showNotification('Reason saved');
      setEditingReason(null);
      fetchAdminData(token!);
      onDataUpdated();
    }
  };

  const deleteReason = async (id: string) => {
    if (!confirm('Delete this reason?')) return;
    const res = await fetch(`/api/admin/reason/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      showNotification('Reason deleted');
      fetchAdminData(token!);
      onDataUpdated();
    }
  };

  const savePromise = async () => {
    if (!editingPromise || !editingPromise.title) return;
    const res = await fetch('/api/admin/promise', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(editingPromise),
    });
    if (res.ok) {
      showNotification('Promise saved');
      setEditingPromise(null);
      fetchAdminData(token!);
      onDataUpdated();
    }
  };

  const deletePromise = async (id: string) => {
    if (!confirm('Delete this promise?')) return;
    const res = await fetch(`/api/admin/promise/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      showNotification('Promise deleted');
      fetchAdminData(token!);
      onDataUpdated();
    }
  };

  const savePlan = async () => {
    if (!editingPlan || !editingPlan.title) return;
    const res = await fetch('/api/admin/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(editingPlan),
    });
    if (res.ok) {
      showNotification('Future dream plan saved');
      setEditingPlan(null);
      fetchAdminData(token!);
      onDataUpdated();
    }
  };

  const deletePlan = async (id: string) => {
    if (!confirm('Delete this future dream?')) return;
    const res = await fetch(`/api/admin/plan/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      showNotification('Plan deleted');
      fetchAdminData(token!);
      onDataUpdated();
    }
  };

  const saveTrack = async () => {
    if (!editingTrack || !editingTrack.title || !editingTrack.url) return;
    const res = await fetch('/api/admin/music', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(editingTrack),
    });
    if (res.ok) {
      showNotification('Track saved');
      setEditingTrack(null);
      fetchAdminData(token!);
      onDataUpdated();
    }
  };

  const deleteTrack = async (id: string) => {
    if (!confirm('Delete this music track?')) return;
    const res = await fetch(`/api/admin/music/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      showNotification('Track removed');
      fetchAdminData(token!);
      onDataUpdated();
    }
  };

  const saveSecretRoom = async (updates: Partial<SecretRoomData>) => {
    const res = await fetch('/api/admin/secret-room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      showNotification('Secret room configuration updated');
      fetchAdminData(token!);
      onDataUpdated();
    }
  };

  const saveSettings = async (updates: Partial<SiteSettings>) => {
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      showNotification('Universe settings updated');
      fetchAdminData(token!);
      onDataUpdated();
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMessage(null);
    const res = await fetch('/api/admin/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setPwMessage('Password changed successfully!');
      setCurrentPw('');
      setNewPw('');
    } else {
      setPwMessage(data.error || 'Failed to update password');
    }
  };

  const handleDownloadBackup = () => {
    window.location.href = `/api/admin/backup?token=${token}`;
  };

  const handleRestoreBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!confirm('WARNING: Restoring a backup will overwrite all current memories, photos, letters, and settings. Proceed?')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const backupJson = JSON.parse(reader.result as string);
        const res = await fetch('/api/admin/restore', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ backupData: backupJson.data || backupJson }),
        });
        const result = await res.json();
        if (result.success) {
          alert('Backup restored successfully!');
          fetchAdminData(token!);
          onDataUpdated();
        } else {
          alert(result.error || 'Failed to restore');
        }
      } catch (err) {
        alert('Invalid JSON backup file');
      }
    };
    reader.readAsText(file);
  };

  // ----------------- LOGIN VIEW ----------------- //
  if (!token) {
    return (
      <div className="mx-auto max-w-md px-4 py-20">
        <div className="overflow-hidden rounded-[32px] border border-[#DED4C1] bg-white p-8 natural-card-shadow text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FAF7F2] text-[#6B5B4A] border border-[#DED4C1]">
            <Shield className="h-8 w-8" />
          </div>

          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-normal text-[#1A1A1A]">
              Command Sanctuary
            </h2>
            <p className="text-xs text-[#1A1A1A]/70 font-sans">
              Private content administration for Sampa's universe
            </p>
          </div>

          <div className="rounded-xl border border-[#DED4C1] bg-[#F5F2ED] p-3 text-[11px] text-[#6B5B4A] font-sans">
            Initial default password: <span className="font-mono text-[#1A1A1A] font-semibold">sampaforever123</span>
          </div>

          {loginError && (
            <div className="flex items-center gap-2 rounded-xl bg-[#FDF2F2] border border-[#F8D7DA] p-3 text-xs text-[#721C24] text-left font-sans">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B5B4A]" />
              <input
                type="password"
                placeholder="Administrator password..."
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full rounded-2xl border border-[#DED4C1] bg-white py-3 pl-10 pr-4 text-sm text-[#1A1A1A] placeholder-[#6B5B4A]/60 focus:border-[#6B5B4A] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#1A1A1A] py-3.5 text-xs font-sans uppercase tracking-widest font-bold text-[#F5F2ED] shadow-sm hover:bg-[#333333] active:scale-95 disabled:opacity-50 transition-all"
            >
              {isLoggingIn ? 'Verifying...' : 'Enter Dashboard'}
            </button>
          </form>

          <button
            onClick={() => navigate('/')}
            className="text-xs text-[#6B5B4A] hover:text-[#1A1A1A] underline pt-2 font-sans"
          >
            Return to Public Website
          </button>
        </div>
      </div>
    );
  }

  // ----------------- DASHBOARD VIEW ----------------- //
  if (!adminData) {
    return (
      <div className="py-24 text-center">
        <RefreshCw className="h-8 w-8 animate-spin text-[#6B5B4A] mx-auto mb-3" />
        <p className="text-xs text-[#6B5B4A] font-sans">Loading Universe Management Console...</p>
      </div>
    );
  }

  const { universe, secretRoom } = adminData;

  const tabs = [
    { id: 'photos', label: 'Photos', icon: ImageIcon, count: universe.photos.length },
    { id: 'memories', label: 'Memories', icon: BookOpen, count: universe.memories.length },
    { id: 'letters', label: 'Love Letters', icon: Heart, count: universe.letters.length },
    { id: 'reasons', label: 'Reasons', icon: Sparkles, count: universe.reasons.length },
    { id: 'promises', label: 'Promises', icon: Shield, count: universe.promises.length },
    { id: 'plans', label: 'Future Plans', icon: Compass, count: universe.plans.length },
    { id: 'music', label: 'Music', icon: Music, count: universe.music.length },
    { id: 'secret', label: 'Secret Room', icon: Lock },
    { id: 'settings', label: 'Sampa & Settings', icon: Settings },
    { id: 'backup', label: 'Backup & Security', icon: Download },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#DED4C1] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#EBE4D8] border border-[#DED4C1] px-2.5 py-0.5 text-[10px] font-sans font-bold text-[#6B5B4A] uppercase tracking-wider">
              Admin Authenticated
            </span>
            <span className="text-xs text-[#6B5B4A] font-sans">Build Once → Manage Content Forever</span>
          </div>
          <h1 className="font-serif text-2xl font-normal text-[#1A1A1A] mt-1">
            Universe Content Management Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 rounded-xl border border-[#DED4C1] bg-white px-3 py-1.5 text-xs font-sans text-[#1A1A1A] hover:bg-[#EBE4D8] transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>View Live Website</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-xl border border-[#DED4C1] bg-[#FAF7F2] px-3 py-1.5 text-xs font-sans text-[#6B5B4A] hover:bg-[#EBE4D8] transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Toast notification */}
      {actionMessage && (
        <div className="rounded-xl border border-[#DED4C1] bg-white p-3 text-xs text-[#1A1A1A] flex items-center gap-2 natural-card-shadow font-sans animate-in fade-in">
          <Check className="h-4 w-4 text-[#6B5B4A]" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Tabs Row */}
      <div className="flex overflow-x-auto gap-2 border-b border-[#DED4C1] pb-2 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-sans font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#1A1A1A] text-[#F5F2ED] shadow-sm'
                  : 'border border-[#DED4C1] bg-white text-[#6B5B4A] hover:bg-[#EBE4D8] hover:text-[#1A1A1A]'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                  isActive ? 'bg-white/20 text-[#F5F2ED]' : 'bg-[#FAF7F2] text-[#6B5B4A]'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: PHOTOS */}
      {activeTab === 'photos' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-normal text-[#1A1A1A]">Photograph Archive</h2>
              <p className="text-xs text-[#6B5B4A] font-sans">
                Upload pictures from your phone or computer, or link cloud storage URLs. They appear instantly on the live site!
              </p>
            </div>
            <button
              onClick={() =>
                setEditingPhoto({
                  title: '',
                  url: '',
                  caption: '',
                  date: new Date().toISOString().split('T')[0],
                  category: 'special-days',
                  album: 'First Chapters',
                  isFavorite: false,
                })
              }
              className="flex items-center gap-2 rounded-xl bg-[#1A1A1A] px-4 py-2 text-xs font-sans uppercase tracking-wider font-bold text-[#F5F2ED] hover:bg-[#333333] shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Upload / Add Photo</span>
            </button>
          </div>

          {/* Edit / Add Photo Modal / Box */}
          {editingPhoto && (
            <div className="rounded-[28px] border border-[#DED4C1] bg-white natural-card-shadow p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#DED4C1] pb-3">
                <h3 className="font-serif text-base font-normal text-[#1A1A1A]">
                  {editingPhoto.id ? 'Edit Photograph' : 'Add New Photograph to Archive'}
                </h3>
                <button
                  onClick={() => setEditingPhoto(null)}
                  className="text-xs text-[#6B5B4A] font-sans hover:text-[#1A1A1A]"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Direct file upload button */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#1A1A1A] font-sans">Upload Image File (Device/Phone)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleFileUpload(e, (url) => setEditingPhoto((prev) => ({ ...prev, url })))
                    }
                    className="block w-full text-xs text-[#6B5B4A] font-sans file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-rose-600 file:text-white hover:file:bg-rose-500 cursor-pointer"
                  />
                  {uploadingFile && <p className="text-xs text-[#6B5B4A]">Uploading photo...</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Photo URL (or uploaded link)</label>
                  <input
                    type="text"
                    placeholder="https://... or /uploads/..."
                    value={editingPhoto.url || ''}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, url: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Sunset in Venice"
                    value={editingPhoto.title || ''}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Album Name</label>
                  <input
                    type="text"
                    placeholder="e.g. First Chapters, Escapes, Unfiltered"
                    value={editingPhoto.album || ''}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, album: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Category</label>
                  <select
                    value={editingPhoto.category || 'special-days'}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, category: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  >
                    <option value="special-days">Special Days</option>
                    <option value="trips">Trips</option>
                    <option value="everyday">Everyday</option>
                    <option value="milestones">Milestones</option>
                    <option value="candid">Candid</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Date Captured</label>
                  <input
                    type="date"
                    value={editingPhoto.date || ''}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, date: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="isFav"
                    checked={editingPhoto.isFavorite || false}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, isFavorite: e.target.checked })}
                    className="h-4 w-4 rounded accent-[#6B5B4A]"
                  />
                  <label htmlFor="isFav" className="text-xs text-[#1A1A1A] font-sans">
                    Mark as Favorite (Featured on Homepage)
                  </label>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs text-[#1A1A1A] font-sans">Caption / Romantic Thought</label>
                  <textarea
                    rows={2}
                    placeholder="Short description..."
                    value={editingPhoto.caption || ''}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, caption: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              {editingPhoto.url && (
                <div className="h-32 w-48 rounded-xl overflow-hidden border border-[#DED4C1]">
                  <img src={editingPhoto.url} alt="Preview" className="h-full w-full object-cover" />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setEditingPhoto(null)}
                  className="rounded-xl border border-[#DED4C1] bg-white px-4 py-2 text-xs font-sans text-[#6B5B4A] hover:bg-[#EBE4D8]"
                >
                  Cancel
                </button>
                <button
                  onClick={savePhoto}
                  className="rounded-xl bg-[#1A1A1A] px-5 py-2 text-xs font-sans uppercase tracking-wider font-bold text-[#F5F2ED] hover:bg-[#333333] shadow-sm"
                >
                  Save Photograph
                </button>
              </div>
            </div>
          )}

          {/* Photos Grid Table */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {universe.photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative overflow-hidden rounded-[24px] border border-[#DED4C1] bg-white natural-card-shadow p-2 space-y-2"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-800">
                  <img src={photo.url} alt={photo.title} className="h-full w-full object-cover" />
                  {photo.isFavorite && (
                    <div className="absolute top-1 left-1 rounded-full bg-rose-600 p-1 text-white">
                      <Heart className="h-2.5 w-2.5 fill-white" />
                    </div>
                  )}
                </div>

                <div className="truncate">
                  <div className="truncate text-xs font-semibold text-[#1A1A1A]">{photo.title}</div>
                  <div className="text-[10px] text-slate-500">{photo.album}</div>
                </div>

                <div className="flex items-center justify-between border-t border-[#DED4C1] pt-1.5">
                  <button
                    onClick={() => setEditingPhoto(photo)}
                    className="p-1 text-slate-400 hover:text-[#1A1A1A]"
                    title="Edit"
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="p-1 text-slate-400 hover:text-[#6B5B4A]"
                    title="Delete"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: MEMORIES */}
      {activeTab === 'memories' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-normal text-[#1A1A1A]">Relationship Memories</h2>
              <p className="text-xs text-[#6B5B4A] font-sans">
                Create stories with shareable links (e.g. <span className="font-mono text-[#6B5B4A]">/memory/our-first-date</span>).
              </p>
            </div>
            <button
              onClick={() =>
                setEditingMemory({
                  title: '',
                  slug: '',
                  date: new Date().toISOString().split('T')[0],
                  location: 'Our Special Place',
                  category: 'Milestone',
                  summary: '',
                  description: '',
                  photoUrls: [],
                  featured: false,
                  tags: ['Romantic'],
                })
              }
              className="flex items-center gap-2 rounded-xl bg-[#1A1A1A] px-4 py-2 text-xs font-sans uppercase tracking-wider font-bold text-[#F5F2ED] hover:bg-[#333333] shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Memory</span>
            </button>
          </div>

          {editingMemory && (
            <div className="rounded-[28px] border border-[#DED4C1] bg-white natural-card-shadow p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#DED4C1] pb-3">
                <h3 className="font-serif text-base font-normal text-[#1A1A1A]">
                  {editingMemory.id ? 'Edit Memory' : 'Create Memory Chapter'}
                </h3>
                <button onClick={() => setEditingMemory(null)} className="text-xs text-[#6B5B4A] font-sans hover:text-[#1A1A1A]">
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Title</label>
                  <input
                    type="text"
                    value={editingMemory.title || ''}
                    onChange={(e) => setEditingMemory({ ...editingMemory, title: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">URL Slug (e.g. /memory/first-date)</label>
                  <input
                    type="text"
                    value={editingMemory.slug || ''}
                    onChange={(e) => setEditingMemory({ ...editingMemory, slug: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Location</label>
                  <input
                    type="text"
                    value={editingMemory.location || ''}
                    onChange={(e) => setEditingMemory({ ...editingMemory, location: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Date</label>
                  <input
                    type="date"
                    value={editingMemory.date || ''}
                    onChange={(e) => setEditingMemory({ ...editingMemory, date: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Category</label>
                  <input
                    type="text"
                    value={editingMemory.category || ''}
                    onChange={(e) => setEditingMemory({ ...editingMemory, category: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={(editingMemory.tags || []).join(', ')}
                    onChange={(e) =>
                      setEditingMemory({
                        ...editingMemory,
                        tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs text-[#1A1A1A] font-sans">Attach Photo URL(s) (comma separated)</label>
                  <input
                    type="text"
                    value={(editingMemory.photoUrls || []).join(', ')}
                    onChange={(e) =>
                      setEditingMemory({
                        ...editingMemory,
                        photoUrls: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs text-[#1A1A1A] font-sans">Short Summary</label>
                  <input
                    type="text"
                    value={editingMemory.summary || ''}
                    onChange={(e) => setEditingMemory({ ...editingMemory, summary: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs text-[#1A1A1A] font-sans">Full Story Narrative</label>
                  <textarea
                    rows={4}
                    value={editingMemory.description || ''}
                    onChange={(e) => setEditingMemory({ ...editingMemory, description: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setEditingMemory(null)}
                  className="rounded-xl border border-[#DED4C1] bg-white px-4 py-2 text-xs font-sans text-[#6B5B4A] hover:bg-[#EBE4D8]"
                >
                  Cancel
                </button>
                <button
                  onClick={saveMemory}
                  className="rounded-xl bg-[#1A1A1A] px-5 py-2 text-xs font-sans uppercase tracking-wider font-bold text-[#F5F2ED] hover:bg-[#333333] shadow-sm"
                >
                  Save Memory
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {universe.memories.map((mem) => (
              <div
                key={mem.id}
                className="flex items-center justify-between rounded-[24px] border border-[#DED4C1] bg-white natural-card-shadow p-4 transition-colors hover:border-[#6B5B4A]"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-sm font-normal text-[#1A1A1A]">{mem.title}</span>
                    <span className="rounded-full bg-[#FAF7F2] border border-[#DED4C1] px-2 py-0.5 text-[10px] text-[#6B5B4A]">
                      /{mem.slug}
                    </span>
                  </div>
                  <div className="text-xs text-[#6B5B4A] font-sans">{mem.date} • {mem.location}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingMemory(mem)}
                    className="rounded-lg p-1.5 text-slate-400 hover:text-[#1A1A1A]"
                    title="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteMemory(mem.id)}
                    className="rounded-lg p-1.5 text-slate-400 hover:text-[#6B5B4A]"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: LOVE LETTERS */}
      {activeTab === 'letters' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-normal text-[#1A1A1A]">Love Letter Parchments</h2>
              <p className="text-xs text-[#6B5B4A] font-sans">
                Write sealed letters with optional future unlock countdown dates.
              </p>
            </div>
            <button
              onClick={() =>
                setEditingLetter({
                  title: '',
                  date: new Date().toISOString().split('T')[0],
                  content: '',
                  excerpt: '',
                  unlockDate: null,
                  signature: 'Forever Yours ❤️',
                  sealColor: '#e11d48',
                })
              }
              className="flex items-center gap-2 rounded-xl bg-[#1A1A1A] px-4 py-2 text-xs font-sans uppercase tracking-wider font-bold text-[#F5F2ED] hover:bg-[#333333] shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Write Love Letter</span>
            </button>
          </div>

          {editingLetter && (
            <div className="rounded-[28px] border border-[#DED4C1] bg-white natural-card-shadow p-6 space-y-4">
              <h3 className="font-serif text-base font-normal text-[#1A1A1A]">
                {editingLetter.id ? 'Edit Letter' : 'Penned Love Letter'}
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Letter Title</label>
                  <input
                    type="text"
                    value={editingLetter.title || ''}
                    onChange={(e) => setEditingLetter({ ...editingLetter, title: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Written Date</label>
                  <input
                    type="date"
                    value={editingLetter.date || ''}
                    onChange={(e) => setEditingLetter({ ...editingLetter, date: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">
                    Scheduled Unlock Date (Leave blank to unlock immediately)
                  </label>
                  <input
                    type="datetime-local"
                    value={editingLetter.unlockDate ? editingLetter.unlockDate.slice(0, 16) : ''}
                    onChange={(e) =>
                      setEditingLetter({
                        ...editingLetter,
                        unlockDate: e.target.value ? new Date(e.target.value).toISOString() : null,
                      })
                    }
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Signature</label>
                  <input
                    type="text"
                    value={editingLetter.signature || ''}
                    onChange={(e) => setEditingLetter({ ...editingLetter, signature: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs text-[#1A1A1A] font-sans">Full Content</label>
                  <textarea
                    rows={6}
                    value={editingLetter.content || ''}
                    onChange={(e) => setEditingLetter({ ...editingLetter, content: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white font-serif text-base"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setEditingLetter(null)}
                  className="rounded-xl border border-[#DED4C1] bg-white px-4 py-2 text-xs font-sans text-[#6B5B4A] hover:bg-[#EBE4D8]"
                >
                  Cancel
                </button>
                <button
                  onClick={saveLetter}
                  className="rounded-xl bg-[#1A1A1A] px-5 py-2 text-xs font-sans uppercase tracking-wider font-bold text-[#F5F2ED] hover:bg-[#333333] shadow-sm"
                >
                  Save Letter
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {universe.letters.map((letter) => (
              <div
                key={letter.id}
                className="flex items-center justify-between rounded-[24px] border border-[#DED4C1] bg-white natural-card-shadow p-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-sm font-normal text-[#1A1A1A]">{letter.title}</span>
                    {letter.unlockDate && (
                      <span className="rounded-full bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 text-[10px] text-amber-300">
                        Locked until {new Date(letter.unlockDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#6B5B4A] font-sans">{letter.date}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingLetter(letter)}
                    className="rounded-lg p-1.5 text-slate-400 hover:text-[#1A1A1A]"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteLetter(letter.id)}
                    className="rounded-lg p-1.5 text-slate-400 hover:text-[#6B5B4A]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: REASONS */}
      {activeTab === 'reasons' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-normal text-[#1A1A1A]">Reasons Why I Love Sampa</h2>
              <p className="text-xs text-[#6B5B4A] font-sans">Add, edit, or reorder reasons.</p>
            </div>
            <button
              onClick={() =>
                setEditingReason({
                  title: '',
                  description: '',
                  category: 'Our Love',
                  number: universe.reasons.length + 1,
                  heartCount: 1,
                })
              }
              className="flex items-center gap-2 rounded-xl bg-[#1A1A1A] px-4 py-2 text-xs font-sans uppercase tracking-wider font-bold text-[#F5F2ED] hover:bg-[#333333] shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Reason</span>
            </button>
          </div>

          {editingReason && (
            <div className="rounded-[28px] border border-[#DED4C1] bg-white natural-card-shadow p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Reason #</label>
                  <input
                    type="number"
                    value={editingReason.number || ''}
                    onChange={(e) => setEditingReason({ ...editingReason, number: parseInt(e.target.value) || 1 })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs text-[#1A1A1A] font-sans">Title</label>
                  <input
                    type="text"
                    value={editingReason.title || ''}
                    onChange={(e) => setEditingReason({ ...editingReason, title: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1 sm:col-span-3">
                  <label className="text-xs text-[#1A1A1A] font-sans">Detailed Description</label>
                  <textarea
                    rows={2}
                    value={editingReason.description || ''}
                    onChange={(e) => setEditingReason({ ...editingReason, description: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setEditingReason(null)}
                  className="rounded-xl border border-[#DED4C1] px-4 py-2 text-xs text-[#6B5B4A] font-sans"
                >
                  Cancel
                </button>
                <button
                  onClick={saveReason}
                  className="rounded-xl bg-[#1A1A1A] px-5 py-2 text-xs font-sans uppercase tracking-wider font-bold text-[#F5F2ED] hover:bg-[#333333] shadow-sm"
                >
                  Save Reason
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {universe.reasons.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between rounded-[24px] border border-[#DED4C1] bg-white natural-card-shadow p-3.5"
              >
                <div className="truncate pr-2">
                  <div className="truncate text-xs font-semibold text-[#1A1A1A]">
                    #{r.number} {r.title}
                  </div>
                  <div className="text-[10px] text-slate-500">{r.category} • {r.heartCount} reactions</div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button onClick={() => setEditingReason(r)} className="p-1 text-slate-400 hover:text-[#1A1A1A]">
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => deleteReason(r.id)} className="p-1 text-slate-400 hover:text-[#6B5B4A]">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: PROMISES */}
      {activeTab === 'promises' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-normal text-[#1A1A1A]">Promises & Vows</h2>
              <p className="text-xs text-[#6B5B4A] font-sans">Eternal commitments.</p>
            </div>
            <button
              onClick={() =>
                setEditingPromise({
                  title: '',
                  description: '',
                  category: 'Romance',
                  status: 'forever',
                  dateGiven: new Date().toISOString().split('T')[0],
                })
              }
              className="flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white"
            >
              <Plus className="h-4 w-4" />
              <span>Add Promise</span>
            </button>
          </div>

          {editingPromise && (
            <div className="rounded-[28px] border border-[#DED4C1] bg-white natural-card-shadow p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs text-[#1A1A1A] font-sans">Promise Title</label>
                  <input
                    type="text"
                    value={editingPromise.title || ''}
                    onChange={(e) => setEditingPromise({ ...editingPromise, title: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Category</label>
                  <input
                    type="text"
                    value={editingPromise.category || ''}
                    onChange={(e) => setEditingPromise({ ...editingPromise, category: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Status</label>
                  <select
                    value={editingPromise.status || 'forever'}
                    onChange={(e) => setEditingPromise({ ...editingPromise, status: e.target.value as any })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  >
                    <option value="forever">Forever</option>
                    <option value="always">Always</option>
                    <option value="kept">Kept</option>
                  </select>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs text-[#1A1A1A] font-sans">Description</label>
                  <textarea
                    rows={3}
                    value={editingPromise.description || ''}
                    onChange={(e) => setEditingPromise({ ...editingPromise, description: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setEditingPromise(null)} className="rounded-xl border border-[#DED4C1] px-4 py-2 text-xs text-[#6B5B4A] font-sans">
                  Cancel
                </button>
                <button onClick={savePromise} className="rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white">
                  Save Promise
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {universe.promises.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-[24px] border border-[#DED4C1] bg-white natural-card-shadow p-4">
                <div>
                  <div className="text-sm font-semibold text-white">{p.title}</div>
                  <div className="text-xs text-[#6B5B4A] font-sans">{p.category} • Status: {p.status}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditingPromise(p)} className="p-1 text-slate-400 hover:text-[#1A1A1A]">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => deletePromise(p.id)} className="p-1 text-slate-400 hover:text-[#6B5B4A]">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: PLANS */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-normal text-[#1A1A1A]">Future Dreams & Bucket List</h2>
              <p className="text-xs text-[#6B5B4A] font-sans">Adventures and milestones waiting ahead.</p>
            </div>
            <button
              onClick={() =>
                setEditingPlan({
                  title: '',
                  category: 'travel',
                  targetDate: 'Summer 2026',
                  isCompleted: false,
                  notes: '',
                })
              }
              className="flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white"
            >
              <Plus className="h-4 w-4" />
              <span>Add Dream</span>
            </button>
          </div>

          {editingPlan && (
            <div className="rounded-[28px] border border-[#DED4C1] bg-white natural-card-shadow p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs text-[#1A1A1A] font-sans">Dream Title</label>
                  <input
                    type="text"
                    value={editingPlan.title || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, title: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Category</label>
                  <select
                    value={editingPlan.category || 'travel'}
                    onChange={(e) => setEditingPlan({ ...editingPlan, category: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  >
                    <option value="travel">Travel</option>
                    <option value="home">Home</option>
                    <option value="milestone">Milestone</option>
                    <option value="adventures">Adventures</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Target Timeframe</label>
                  <input
                    type="text"
                    value={editingPlan.targetDate || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, targetDate: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="flex items-center gap-2 pt-2 sm:col-span-2">
                  <input
                    type="checkbox"
                    id="planDone"
                    checked={editingPlan.isCompleted || false}
                    onChange={(e) => setEditingPlan({ ...editingPlan, isCompleted: e.target.checked })}
                    className="h-4 w-4 rounded accent-[#6B5B4A]"
                  />
                  <label htmlFor="planDone" className="text-xs text-[#1A1A1A] font-sans">
                    Mark as Completed / Accomplished
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setEditingPlan(null)} className="rounded-xl border border-[#DED4C1] px-4 py-2 text-xs text-[#6B5B4A] font-sans">
                  Cancel
                </button>
                <button onClick={savePlan} className="rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white">
                  Save Dream
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {universe.plans.map((plan) => (
              <div key={plan.id} className="flex items-center justify-between rounded-[24px] border border-[#DED4C1] bg-white natural-card-shadow p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{plan.title}</span>
                    {plan.isCompleted && (
                      <span className="rounded-full bg-emerald-950 px-2 py-0.5 text-[10px] text-emerald-300 border border-emerald-500/30">
                        Done
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#6B5B4A] font-sans">{plan.category} • Target: {plan.targetDate}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditingPlan(plan)} className="p-1 text-slate-400 hover:text-[#1A1A1A]">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => deletePlan(plan.id)} className="p-1 text-slate-400 hover:text-[#6B5B4A]">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: MUSIC */}
      {activeTab === 'music' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-normal text-[#1A1A1A]">Melody Playlist</h2>
              <p className="text-xs text-[#6B5B4A] font-sans">Manage audio files and special dedications.</p>
            </div>
            <button
              onClick={() =>
                setEditingTrack({
                  title: '',
                  artist: '',
                  url: '',
                  duration: '3:00',
                  mood: 'Romantic',
                  albumCover: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=400',
                  specialNote: '',
                })
              }
              className="flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white"
            >
              <Plus className="h-4 w-4" />
              <span>Add Audio Track</span>
            </button>
          </div>

          {editingTrack && (
            <div className="rounded-[28px] border border-[#DED4C1] bg-white natural-card-shadow p-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Track Title</label>
                  <input
                    type="text"
                    value={editingTrack.title || ''}
                    onChange={(e) => setEditingTrack({ ...editingTrack, title: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Artist</label>
                  <input
                    type="text"
                    value={editingTrack.artist || ''}
                    onChange={(e) => setEditingTrack({ ...editingTrack, artist: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs text-[#1A1A1A] font-sans">Audio Stream URL (.mp3 / direct stream)</label>
                  <input
                    type="text"
                    value={editingTrack.url || ''}
                    onChange={(e) => setEditingTrack({ ...editingTrack, url: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Album Cover Image URL</label>
                  <input
                    type="text"
                    value={editingTrack.albumCover || ''}
                    onChange={(e) => setEditingTrack({ ...editingTrack, albumCover: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-[#1A1A1A] font-sans">Mood</label>
                  <input
                    type="text"
                    value={editingTrack.mood || ''}
                    onChange={(e) => setEditingTrack({ ...editingTrack, mood: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs text-[#1A1A1A] font-sans">Special Dedication Note</label>
                  <input
                    type="text"
                    value={editingTrack.specialNote || ''}
                    onChange={(e) => setEditingTrack({ ...editingTrack, specialNote: e.target.value })}
                    className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setEditingTrack(null)} className="rounded-xl border border-[#DED4C1] px-4 py-2 text-xs text-[#6B5B4A] font-sans">
                  Cancel
                </button>
                <button onClick={saveTrack} className="rounded-xl bg-rose-600 px-5 py-2 text-xs font-bold text-white">
                  Save Track
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {universe.music.map((m) => (
              <div key={m.id} className="flex items-center justify-between rounded-[24px] border border-[#DED4C1] bg-white natural-card-shadow p-4">
                <div>
                  <div className="text-sm font-semibold text-white">{m.title}</div>
                  <div className="text-xs text-[#6B5B4A] font-sans">{m.artist} • {m.duration}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditingTrack(m)} className="p-1 text-slate-400 hover:text-[#1A1A1A]">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => deleteTrack(m.id)} className="p-1 text-slate-400 hover:text-[#6B5B4A]">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: SECRET ROOM */}
      {activeTab === 'secret' && (
        <div className="rounded-3xl border border-amber-500/30 bg-[#0f111c] p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="font-serif text-xl font-normal text-[#1A1A1A]">Secret Room Configuration</h2>
            <p className="text-xs text-[#6B5B4A] font-sans">
              Control the password, riddle hint, secret letter, and private photos.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs text-amber-300 font-semibold">Secret Room Password</label>
              <input
                type="text"
                defaultValue={secretRoom.password}
                id="secretPasswordInput"
                className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-[#1A1A1A] font-sans">Riddle / Hint</label>
              <input
                type="text"
                defaultValue={secretRoom.hint}
                id="secretHintInput"
                className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs text-[#1A1A1A] font-sans">Secret Sanctuary Letter</label>
              <textarea
                rows={6}
                defaultValue={secretRoom.secretLetter}
                id="secretLetterInput"
                className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white font-serif text-base"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs text-[#1A1A1A] font-sans">Secret Photos URLs (comma separated)</label>
              <input
                type="text"
                defaultValue={(secretRoom.secretPhotos || []).join(', ')}
                id="secretPhotosInput"
                className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <button
            onClick={() => {
              const pw = (document.getElementById('secretPasswordInput') as HTMLInputElement).value;
              const hint = (document.getElementById('secretHintInput') as HTMLInputElement).value;
              const letter = (document.getElementById('secretLetterInput') as HTMLTextAreaElement).value;
              const photosStr = (document.getElementById('secretPhotosInput') as HTMLInputElement).value;
              saveSecretRoom({
                password: pw,
                hint,
                secretLetter: letter,
                secretPhotos: photosStr.split(',').map((s) => s.trim()).filter(Boolean),
              });
            }}
            className="rounded-xl bg-amber-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-amber-500"
          >
            Update Secret Room Settings
          </button>
        </div>
      )}

      {/* TAB CONTENT: SETTINGS & SAMPA'S INFO */}
      {activeTab === 'settings' && (
        <div className="rounded-3xl border border-[#DED4C1] bg-white p-6 sm:p-8 space-y-6 natural-card-shadow">
          <div>
            <h2 className="font-serif text-xl font-normal text-[#1A1A1A]">Sampa's Universe Settings</h2>
            <p className="text-xs text-[#6B5B4A] font-sans">
              Customize partner names, relationship start & anniversary date, domain configuration, and SEO indexing.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs text-[#1A1A1A] font-sans">Partner Name (Dedicated To)</label>
              <input
                type="text"
                defaultValue={universe.settings.partnerName}
                id="setPartnerName"
                className="w-full rounded-xl border border-[#DED4C1] bg-[#FAF7F2] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6B5B4A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-[#1A1A1A] font-sans">Author Name (Created By)</label>
              <input
                type="text"
                defaultValue={universe.settings.authorName}
                id="setAuthorName"
                className="w-full rounded-xl border border-[#DED4C1] bg-[#FAF7F2] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6B5B4A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-[#1A1A1A] font-sans">Loving Each Other From (Powers Live Counter)</label>
              <input
                type="datetime-local"
                defaultValue={universe.settings.anniversaryDate ? universe.settings.anniversaryDate.slice(0, 16) : ''}
                id="setAnniversaryDate"
                className="w-full rounded-xl border border-[#DED4C1] bg-[#FAF7F2] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6B5B4A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-[#1A1A1A] font-sans">Configured Custom Domain</label>
              <input
                type="text"
                placeholder="e.g. www.sampa-love.com"
                defaultValue={universe.settings.customDomain}
                id="setCustomDomain"
                className="w-full rounded-xl border border-[#DED4C1] bg-[#FAF7F2] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6B5B4A]"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs text-[#1A1A1A] font-sans">Hero Tagline</label>
              <input
                type="text"
                defaultValue={universe.settings.heroTagline}
                id="setHeroTagline"
                className="w-full rounded-xl border border-[#DED4C1] bg-[#FAF7F2] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6B5B4A]"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs text-[#1A1A1A] font-sans">Hero Subtext</label>
              <textarea
                rows={2}
                defaultValue={universe.settings.heroSubtext}
                id="setHeroSubtext"
                className="w-full rounded-xl border border-[#DED4C1] bg-[#FAF7F2] px-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#6B5B4A]"
              />
            </div>

            <div className="flex items-center gap-2 sm:col-span-2 pt-2">
              <input
                type="checkbox"
                id="setNoIndex"
                defaultChecked={universe.settings.disableSearchEngineIndexing}
                className="h-4 w-4 rounded accent-[#6B5B4A]"
              />
              <label htmlFor="setNoIndex" className="text-xs text-[#1A1A1A] font-sans">
                Prevent Search Engines from Indexing This Website (robots.txt disallow all)
              </label>
            </div>
          </div>

          <button
            onClick={() => {
              const partner = (document.getElementById('setPartnerName') as HTMLInputElement).value;
              const author = (document.getElementById('setAuthorName') as HTMLInputElement).value;
              const anniv = (document.getElementById('setAnniversaryDate') as HTMLInputElement).value;
              const domain = (document.getElementById('setCustomDomain') as HTMLInputElement).value;
              const tagline = (document.getElementById('setHeroTagline') as HTMLInputElement).value;
              const subtext = (document.getElementById('setHeroSubtext') as HTMLTextAreaElement).value;
              const noIndex = (document.getElementById('setNoIndex') as HTMLInputElement).checked;

              saveSettings({
                partnerName: partner,
                authorName: author,
                anniversaryDate: anniv ? new Date(anniv).toISOString() : universe.settings.anniversaryDate,
                customDomain: domain,
                heroTagline: tagline,
                heroSubtext: subtext,
                disableSearchEngineIndexing: noIndex,
              });
            }}
            className="rounded-xl bg-[#1A1A1A] px-6 py-2.5 text-xs font-sans uppercase tracking-wider font-bold text-[#F5F2ED] hover:bg-[#333333] shadow-sm"
          >
            Save All Settings
          </button>
        </div>
      )}

      {/* TAB CONTENT: BACKUP & PASSWORD */}
      {activeTab === 'backup' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Backup & Restore Card */}
          <div className="rounded-[28px] border border-[#DED4C1] bg-white natural-card-shadow p-6 space-y-4">
            <h3 className="font-serif text-base font-normal text-[#1A1A1A] flex items-center gap-2">
              <Download className="h-4 w-4 text-[#6B5B4A]" />
              <span>Backup & Export Universe</span>
            </h3>
            <p className="text-xs text-[#6B5B4A] font-sans">
              Safeguard all memories, love letters, timeline events, promises, plans, and photo metadata with a single JSON backup.
            </p>

            <div className="pt-2">
              <button
                onClick={handleDownloadBackup}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] py-2.5 text-xs font-sans uppercase tracking-wider font-bold text-[#F5F2ED] hover:bg-[#333333] shadow-sm"
              >
                <Download className="h-4 w-4" />
                <span>DOWNLOAD COMPLETE JSON BACKUP</span>
              </button>
            </div>

            <div className="border-t border-[#DED4C1] pt-4 space-y-2">
              <label className="text-xs font-semibold text-[#1A1A1A] font-sans flex items-center gap-1.5">
                <Upload className="h-3.5 w-3.5 text-[#6B5B4A]" />
                <span>Restore Universe from Backup File</span>
              </label>
              <input
                type="file"
                accept=".json"
                onChange={handleRestoreBackup}
                className="block w-full text-xs text-[#6B5B4A] font-sans file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
              />
            </div>
          </div>

          {/* Change Password Card */}
          <div className="rounded-[28px] border border-[#DED4C1] bg-white natural-card-shadow p-6 space-y-4">
            <h3 className="font-serif text-base font-normal text-[#1A1A1A] flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#6B5B4A]" />
              <span>Change Admin Login Password</span>
            </h3>

            {pwMessage && (
              <div className="rounded-xl border border-[#DED4C1] bg-[#FAF7F2] p-3 text-xs text-[#1A1A1A]">
                {pwMessage}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-[#1A1A1A] font-sans">Current Password</label>
                <input
                  type="password"
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  placeholder="Current password..."
                  className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-[#1A1A1A] font-sans">New Password (min 6 characters)</label>
                <input
                  type="password"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  placeholder="New password..."
                  className="w-full rounded-xl border border-[#DED4C1] bg-white px-3 py-2 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#1A1A1A] py-2.5 text-xs font-sans uppercase tracking-wider font-bold text-[#F5F2ED] hover:bg-[#333333] shadow-sm transition-colors"
              >
                Update Admin Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
