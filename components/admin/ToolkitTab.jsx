import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Save, Loader2 } from 'lucide-react';
import { getTools, updateTools } from '@/app/actions/tools';
import Image from 'next/image';

export default function ToolkitTab() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [newTool, setNewTool] = useState({ name: '', icon: '' });

  useEffect(() => {
    setLoading(true);
    getTools()
      .then(setTools)
      .catch(() => setError('Failed to load tools'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (idx, field, value) => {
    setTools(prev => prev.map((t, i) => i === idx ? { ...t, [field]: value } : t));
  };

  const handleAdd = () => {
    if (!newTool.name || !newTool.icon) return;
    setTools(prev => [
      ...prev,
      { ...newTool, id: Date.now() },
    ]);
    setNewTool({ name: '', icon: '' });
  };

  const handleDelete = (idx) => {
    setTools(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await updateTools(tools.map(({ id, ...rest }) => rest));
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
            My Toolkit
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
            Manage your favorite development tools and resources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tool-name" className="text-gray-900 dark:text-gray-200">Tool Name</Label>
              <Input
                id="tool-name"
                name="name"
                value={newTool.name}
                onChange={e => setNewTool(t => ({ ...t, name: e.target.value }))}
                placeholder="e.g. VS Code"
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tool-icon" className="text-gray-900 dark:text-gray-200">Icon Image URL</Label>
              <Input
                id="tool-icon"
                name="icon"
                value={newTool.icon}
                onChange={e => setNewTool(t => ({ ...t, icon: e.target.value }))}
                placeholder="Paste image URL here"
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Preview:</span>
            {newTool.icon && (
              <Image
                src={newTool.icon}
                alt={newTool.name}
                width={40}
                height={40}
                className="w-10 h-10"
              />
            )}
          </div>
          <Button
            onClick={handleAdd}
            disabled={!newTool.name || !newTool.icon}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Tool
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-3xl">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900 dark:text-white">Your Toolkit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool, idx) => (
              <div key={tool.id || idx} className="group p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg">
                    {tool.icon && (
                      <Image
                        src={tool.icon}
                        alt={tool.name}
                        width={40}
                        height={40}
                        className="w-10 h-10"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <Label htmlFor={`tool-name-${idx}`} className="text-gray-900 dark:text-gray-200">Tool Name</Label>
                    <Input
                      id={`tool-name-${idx}`}
                      name="name"
                      className="mb-1 font-semibold text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={tool.name}
                      onChange={e => handleChange(idx, 'name', e.target.value)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(idx)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={handleSave} className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300" disabled={saving}>
            {saving ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />} Save Changes
          </Button>
          {error && <div className="text-red-500 text-center mt-2">{error}</div>}
        </CardContent>
      </Card>
    </div>
  );
}