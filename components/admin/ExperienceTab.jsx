import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Save, Loader2, Pencil } from 'lucide-react';
import { getExperiences, addExperience, updateExperience, deleteExperience } from '@/app/actions/experience';

const initialForm = {
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  isCurrentJob: false,
  location: '',
  workType: '',
  employmentType: '',
  duration: '',
  description: '',
  responsibilities: '',
  technologies: '',
  achievements: '',
  companyLogo: '',
  companyWebsite: '',
  category: '',
};

export default function ExperienceTab() {
  const [experienceList, setExperienceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [newExp, setNewExp] = useState(initialForm);
  const [editIdx, setEditIdx] = useState(null);

  useEffect(() => {
    setLoading(true);
    getExperiences()
      .then(res => setExperienceList(res.experiences || res))
      .catch(() => setError('Failed to load experience data'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (idx, field, value) => {
    setExperienceList(prev => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  const handleToggle = (idx, field) => {
    setExperienceList(prev => prev.map((item, i) => i === idx ? { ...item, [field]: !item[field] } : item));
  };

  const handleDelete = (idx) => {
    setExperienceList(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAdd = () => {
    if (!newExp.company || !newExp.position) return;
    setExperienceList(prev => [
      ...prev,
      { ...newExp, id: Date.now().toString(), responsibilities: newExp.responsibilities.split(','), technologies: newExp.technologies.split(','), achievements: newExp.achievements.split(',') },
    ]);
    setNewExp(initialForm);
  };

  const handleEdit = (idx) => {
    setEditIdx(idx);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      // Save all items: delete all, then re-add all (or you can optimize with update/add/delete per item)
      // For now, update all by deleting all and re-adding
      // But since API supports update/delete by id, do per item
      // We'll just PUT each item by id
      for (const item of experienceList) {
        if (item.id) {
          await updateExperience(item.id, item);
        } else {
          await addExperience({ ...item, id: Date.now().toString() });
        }
      }
    } catch {
      setError('Failed to save changes');
    }
    setSaving(false);
    setEditIdx(null);
  };

  if (loading) return <div className="flex justify-center items-center h-40"><Loader2 className="animate-spin w-6 h-6" /></div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-3xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-gray-900 dark:text-white">
            Experience Management
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
            Manage your professional experience section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-exp-company">Company</Label>
              <Input
                id="new-exp-company"
                name="company"
                value={newExp.company || ''}
                onChange={e => setNewExp(exp => ({ ...exp, company: e.target.value }))}
                placeholder="Company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-exp-position">Position</Label>
              <Input
                id="new-exp-position"
                name="position"
                value={newExp.position || ''}
                onChange={e => setNewExp(exp => ({ ...exp, position: e.target.value }))}
                placeholder="Position"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-exp-start">Start Date</Label>
              <Input
                id="new-exp-start"
                name="startDate"
                value={newExp.startDate || ''}
                onChange={e => setNewExp(exp => ({ ...exp, startDate: e.target.value }))}
                placeholder="YYYY-MM-DD"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-exp-end">End Date</Label>
              <Input
                id="new-exp-end"
                name="endDate"
                value={newExp.endDate || ''}
                onChange={e => setNewExp(exp => ({ ...exp, endDate: e.target.value }))}
                placeholder="YYYY-MM-DD or blank for current"
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Switch checked={newExp.isCurrentJob} onCheckedChange={() => setNewExp(exp => ({ ...exp, isCurrentJob: !exp.isCurrentJob }))} />
              <span className="text-sm text-gray-600 dark:text-gray-400">{newExp.isCurrentJob ? 'Current' : 'Past'}</span>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-exp-location">Location</Label>
              <Input
                id="new-exp-location"
                name="location"
                value={newExp.location || ''}
                onChange={e => setNewExp(exp => ({ ...exp, location: e.target.value }))}
                placeholder="Location"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-exp-workType">Work Type</Label>
              <Input
                id="new-exp-workType"
                name="workType"
                value={newExp.workType || ''}
                onChange={e => setNewExp(exp => ({ ...exp, workType: e.target.value }))}
                placeholder="Work Type"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-exp-employmentType">Employment Type</Label>
              <Input
                id="new-exp-employmentType"
                name="employmentType"
                value={newExp.employmentType || ''}
                onChange={e => setNewExp(exp => ({ ...exp, employmentType: e.target.value }))}
                placeholder="Employment Type"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-exp-duration">Duration</Label>
              <Input
                id="new-exp-duration"
                name="duration"
                value={newExp.duration || ''}
                onChange={e => setNewExp(exp => ({ ...exp, duration: e.target.value }))}
                placeholder="e.g. 1 year 2 months"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-exp-category">Category</Label>
              <Input
                id="new-exp-category"
                name="category"
                value={newExp.category || ''}
                onChange={e => setNewExp(exp => ({ ...exp, category: e.target.value }))}
                placeholder="Category"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-exp-companyLogo">Company Logo URL</Label>
              <Input
                id="new-exp-companyLogo"
                name="companyLogo"
                value={newExp.companyLogo || ''}
                onChange={e => setNewExp(exp => ({ ...exp, companyLogo: e.target.value }))}
                placeholder="Logo URL"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-exp-companyWebsite">Company Website</Label>
              <Input
                id="new-exp-companyWebsite"
                name="companyWebsite"
                value={newExp.companyWebsite || ''}
                onChange={e => setNewExp(exp => ({ ...exp, companyWebsite: e.target.value }))}
                placeholder="Website URL"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="new-exp-description">Description</Label>
              <Input
                id="new-exp-description"
                name="description"
                value={newExp.description || ''}
                onChange={e => setNewExp(exp => ({ ...exp, description: e.target.value }))}
                placeholder="Description"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="new-exp-responsibilities">Responsibilities (comma separated)</Label>
              <Input
                id="new-exp-responsibilities"
                name="responsibilities"
                value={newExp.responsibilities || ''}
                onChange={e => setNewExp(exp => ({ ...exp, responsibilities: e.target.value }))}
                placeholder="e.g. Developed, Designed, Led team"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="new-exp-technologies">Technologies (comma separated)</Label>
              <Input
                id="new-exp-technologies"
                name="technologies"
                value={newExp.technologies || ''}
                onChange={e => setNewExp(exp => ({ ...exp, technologies: e.target.value }))}
                placeholder="e.g. React, Node.js, Python"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="new-exp-achievements">Achievements (comma separated)</Label>
              <Input
                id="new-exp-achievements"
                name="achievements"
                value={newExp.achievements || ''}
                onChange={e => setNewExp(exp => ({ ...exp, achievements: e.target.value }))}
                placeholder="e.g. Awarded, Promoted, Delivered project"
              />
            </div>
          </div>
          <Button
            onClick={handleAdd}
            disabled={!newExp.company || !newExp.position}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Experience
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-3xl">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900 dark:text-white">Your Experience Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {experienceList.map((item, idx) => (
              <div key={item.id} className="group p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 space-y-2">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 min-w-0 space-y-2">
                    <Label htmlFor={`exp-company-${idx}`} className="text-gray-900 dark:text-gray-200">Company</Label>
                    <Input
                      id={`exp-company-${idx}`}
                      name="company"
                      className="mb-1 font-semibold text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={item.company || ''}
                      onChange={e => handleChange(idx, 'company', e.target.value)}
                    />
                    <Label htmlFor={`exp-position-${idx}`} className="text-gray-900 dark:text-gray-200">Position</Label>
                    <Input
                      id={`exp-position-${idx}`}
                      name="position"
                      className="mb-1 font-semibold text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={item.position || ''}
                      onChange={e => handleChange(idx, 'position', e.target.value)}
                    />
                    <Label htmlFor={`exp-description-${idx}`} className="text-gray-900 dark:text-gray-200">Description</Label>
                    <Input
                      id={`exp-description-${idx}`}
                      name="description"
                      className="mb-1 text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={item.description || ''}
                      onChange={e => handleChange(idx, 'description', e.target.value)}
                    />
                    <Label htmlFor={`exp-duration-${idx}`} className="text-gray-900 dark:text-gray-200">Duration</Label>
                    <Input
                      id={`exp-duration-${idx}`}
                      name="duration"
                      className="mb-1 text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={item.duration || ''}
                      onChange={e => handleChange(idx, 'duration', e.target.value)}
                    />
                    <Label htmlFor={`exp-startDate-${idx}`} className="text-gray-900 dark:text-gray-200">Start Date</Label>
                    <Input
                      id={`exp-startDate-${idx}`}
                      name="startDate"
                      className="mb-1 text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={item.startDate || ''}
                      onChange={e => handleChange(idx, 'startDate', e.target.value)}
                    />
                    <Label htmlFor={`exp-endDate-${idx}`} className="text-gray-900 dark:text-gray-200">End Date</Label>
                    <Input
                      id={`exp-endDate-${idx}`}
                      name="endDate"
                      className="mb-1 text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={item.endDate || ''}
                      onChange={e => handleChange(idx, 'endDate', e.target.value)}
                    />
                    <Label htmlFor={`exp-location-${idx}`} className="text-gray-900 dark:text-gray-200">Location</Label>
                    <Input
                      id={`exp-location-${idx}`}
                      name="location"
                      className="mb-1 text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={item.location || ''}
                      onChange={e => handleChange(idx, 'location', e.target.value)}
                    />
                    <Label htmlFor={`exp-workType-${idx}`} className="text-gray-900 dark:text-gray-200">Work Type</Label>
                    <Input
                      id={`exp-workType-${idx}`}
                      name="workType"
                      className="mb-1 text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={item.workType || ''}
                      onChange={e => handleChange(idx, 'workType', e.target.value)}
                    />
                    <Label htmlFor={`exp-employmentType-${idx}`} className="text-gray-900 dark:text-gray-200">Employment Type</Label>
                    <Input
                      id={`exp-employmentType-${idx}`}
                      name="employmentType"
                      className="mb-1 text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={item.employmentType || ''}
                      onChange={e => handleChange(idx, 'employmentType', e.target.value)}
                    />
                    <Label htmlFor={`exp-category-${idx}`} className="text-gray-900 dark:text-gray-200">Category</Label>
                    <Input
                      id={`exp-category-${idx}`}
                      name="category"
                      className="mb-1 text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={item.category || ''}
                      onChange={e => handleChange(idx, 'category', e.target.value)}
                    />
                    <Label htmlFor={`exp-companyLogo-${idx}`} className="text-gray-900 dark:text-gray-200">Company Logo URL</Label>
                    <Input
                      id={`exp-companyLogo-${idx}`}
                      name="companyLogo"
                      className="mb-1 text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={item.companyLogo || ''}
                      onChange={e => handleChange(idx, 'companyLogo', e.target.value)}
                    />
                    <Label htmlFor={`exp-companyWebsite-${idx}`} className="text-gray-900 dark:text-gray-200">Company Website</Label>
                    <Input
                      id={`exp-companyWebsite-${idx}`}
                      name="companyWebsite"
                      className="mb-1 text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={item.companyWebsite || ''}
                      onChange={e => handleChange(idx, 'companyWebsite', e.target.value)}
                    />
                    <Label htmlFor={`exp-responsibilities-${idx}`} className="text-gray-900 dark:text-gray-200">Responsibilities (comma separated)</Label>
                    <Input
                      id={`exp-responsibilities-${idx}`}
                      name="responsibilities"
                      className="mb-1 text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={Array.isArray(item.responsibilities) ? item.responsibilities.join(', ') : (item.responsibilities || '')}
                      onChange={e => handleChange(idx, 'responsibilities', e.target.value.split(','))}
                    />
                    <Label htmlFor={`exp-technologies-${idx}`} className="text-gray-900 dark:text-gray-200">Technologies (comma separated)</Label>
                    <Input
                      id={`exp-technologies-${idx}`}
                      name="technologies"
                      className="mb-1 text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={Array.isArray(item.technologies) ? item.technologies.join(', ') : (item.technologies || '')}
                      onChange={e => handleChange(idx, 'technologies', e.target.value.split(','))}
                    />
                    <Label htmlFor={`exp-achievements-${idx}`} className="text-gray-900 dark:text-gray-200">Achievements (comma separated)</Label>
                    <Input
                      id={`exp-achievements-${idx}`}
                      name="achievements"
                      className="mb-1 text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={Array.isArray(item.achievements) ? item.achievements.join(', ') : (item.achievements || '')}
                      onChange={e => handleChange(idx, 'achievements', e.target.value.split(','))}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-3 min-w-[100px]">
                    <Switch
                      checked={item.isCurrentJob}
                      onCheckedChange={() => handleToggle(idx, 'isCurrentJob')}
                      size="sm"
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.isCurrentJob ? 'Current' : 'Past'}</span>
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