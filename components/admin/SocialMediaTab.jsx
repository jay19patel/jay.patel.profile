import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Save, Loader2 } from 'lucide-react';
import { getSocialMedia, updateSocialMedia } from '@/app/actions/socialMedia';

const ICON_OPTIONS = [
  { value: 'Youtube', label: 'YouTube' },
  { value: 'Instagram', label: 'Instagram' },
  { value: 'Linkedin', label: 'LinkedIn' },
  { value: 'Github', label: 'GitHub' },
];

export default function SocialMediaTab() {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getSocialMedia()
      .then(setPlatforms)
      .catch(() => setError('Failed to load social media data'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (idx, field, value) => {
    setPlatforms(prev => prev.map((p, i) => i === idx ? { ...p, [field]: value } : p));
  };

  const handleAdd = () => {
    setPlatforms(prev => [
      ...prev,
      {
        id: Date.now(),
        name: '',
        username: '',
        description: '',
        icon: 'Youtube',
        bgColor: '',
        darkBgColor: '',
        iconColor: '',
        buttonColor: '',
        link: '',
      },
    ]);
  };

  const handleRemove = (idx) => {
    setPlatforms(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await updateSocialMedia(platforms);
    } catch {
      setError('Failed to save changes');
    }
    setSaving(false);
  };

  if (loading) return <div className="flex justify-center items-center h-40"><Loader2 className="animate-spin w-6 h-6" /></div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-3xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-gray-900 dark:text-white">
            Social Media Platforms
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
            Manage your social media links and descriptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-8">
            {platforms.map((platform, idx) => (
              <div key={platform.id} className="p-6 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-sm relative space-y-4">
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-4 right-4 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20"
                  onClick={() => handleRemove(idx)}
                  title="Remove platform"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${idx}`} className="text-gray-900 dark:text-gray-200">Name</Label>
                    <Input 
                      id={`name-${idx}`} 
                      name="name" 
                      value={platform.name} 
                      onChange={e => handleChange(idx, 'name', e.target.value)} 
                      placeholder="Platform name"
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`username-${idx}`} className="text-gray-900 dark:text-gray-200">Username</Label>
                    <Input 
                      id={`username-${idx}`} 
                      name="username" 
                      value={platform.username} 
                      onChange={e => handleChange(idx, 'username', e.target.value)} 
                      placeholder="@username"
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor={`description-${idx}`} className="text-gray-900 dark:text-gray-200">Description</Label>
                    <Input 
                      id={`description-${idx}`} 
                      name="description" 
                      value={platform.description} 
                      onChange={e => handleChange(idx, 'description', e.target.value)} 
                      placeholder="Short description"
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`icon-${idx}`} className="text-gray-900 dark:text-gray-200">Icon</Label>
                    <select
                      id={`icon-${idx}`}
                      name="icon"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      value={platform.icon}
                      onChange={e => handleChange(idx, 'icon', e.target.value)}
                    >
                      {ICON_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`link-${idx}`} className="text-gray-900 dark:text-gray-200">Link</Label>
                    <Input 
                      id={`link-${idx}`} 
                      name="link" 
                      value={platform.link} 
                      onChange={e => handleChange(idx, 'link', e.target.value)} 
                      placeholder="https://..."
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`bgColor-${idx}`} className="text-gray-900 dark:text-gray-200">BG Color</Label>
                    <Input 
                      id={`bgColor-${idx}`} 
                      name="bgColor" 
                      value={platform.bgColor} 
                      onChange={e => handleChange(idx, 'bgColor', e.target.value)} 
                      placeholder="#fff"
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`darkBgColor-${idx}`} className="text-gray-900 dark:text-gray-200">Dark BG Color</Label>
                    <Input 
                      id={`darkBgColor-${idx}`} 
                      name="darkBgColor" 
                      value={platform.darkBgColor} 
                      onChange={e => handleChange(idx, 'darkBgColor', e.target.value)} 
                      placeholder="#000"
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`iconColor-${idx}`} className="text-gray-900 dark:text-gray-200">Icon Color</Label>
                    <Input 
                      id={`iconColor-${idx}`} 
                      name="iconColor" 
                      value={platform.iconColor} 
                      onChange={e => handleChange(idx, 'iconColor', e.target.value)} 
                      placeholder="#333"
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`buttonColor-${idx}`} className="text-gray-900 dark:text-gray-200">Button Color</Label>
                    <Input 
                      id={`buttonColor-${idx}`} 
                      name="buttonColor" 
                      value={platform.buttonColor} 
                      onChange={e => handleChange(idx, 'buttonColor', e.target.value)} 
                      placeholder="#f00"
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full mt-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700" 
              onClick={handleAdd}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Platform
            </Button>
            <Button 
              onClick={handleSave} 
              className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300" 
              disabled={saving}
            >
              {saving ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />} Save Changes
            </Button>
            {error && <div className="text-red-500 dark:text-red-400 text-center mt-2">{error}</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}