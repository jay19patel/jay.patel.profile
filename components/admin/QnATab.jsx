import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Save, Loader2 } from 'lucide-react';
import { getQnA, updateQnA } from '@/app/actions/qna';

export default function QnATab() {
  const [qnaList, setQnaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [newQnA, setNewQnA] = useState({ question: '', answer: '', active: true });

  useEffect(() => {
    setLoading(true);
    getQnA()
      .then(setQnaList)
      .catch(() => setError('Failed to load QnA data'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (idx, field, value) => {
    setQnaList(prev => prev.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  const handleToggle = (idx) => {
    setQnaList(prev => prev.map((item, i) => i === idx ? { ...item, active: !item.active } : item));
  };

  const handleDelete = (idx) => {
    setQnaList(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAdd = () => {
    if (!newQnA.question || !newQnA.answer) return;
    setQnaList(prev => [
      ...prev,
      { ...newQnA, id: Date.now() },
    ]);
    setNewQnA({ question: '', answer: '', active: true });
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await updateQnA(qnaList);
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
            Q&A Management
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
            Manage your Q&A/FAQ section for your users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new-qna-question" className="text-gray-900 dark:text-gray-200">Question</Label>
              <Input
                id="new-qna-question"
                name="question"
                value={newQnA.question}
                onChange={e => setNewQnA(q => ({ ...q, question: e.target.value }))}
                placeholder="Enter your question"
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-qna-answer" className="text-gray-900 dark:text-gray-200">Answer</Label>
              <Input
                id="new-qna-answer"
                name="answer"
                value={newQnA.answer}
                onChange={e => setNewQnA(q => ({ ...q, answer: e.target.value }))}
                placeholder="Enter the answer"
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Switch checked={newQnA.active} onCheckedChange={() => setNewQnA(q => ({ ...q, active: !q.active }))} />
              <span className="text-sm text-gray-600 dark:text-gray-400">{newQnA.active ? 'Active' : 'Inactive'}</span>
            </div>
          </div>
          <Button
            onClick={handleAdd}
            disabled={!newQnA.question || !newQnA.answer}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Q&A
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-3xl">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900 dark:text-white">Your Q&A Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {qnaList.map((item, idx) => (
              <div key={item.id} className="group p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 space-y-2">
                <div className="flex items-center gap-4">
                  <div className="flex-1 min-w-0 space-y-2">
                    <Label htmlFor={`qna-question-${idx}`} className="text-gray-900 dark:text-gray-200">Question</Label>
                    <Input
                      id={`qna-question-${idx}`}
                      name="question"
                      className="mb-1 font-semibold text-gray-800 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={item.question}
                      onChange={e => handleChange(idx, 'question', e.target.value)}
                    />
                    <Label htmlFor={`qna-answer-${idx}`} className="text-gray-900 dark:text-gray-200">Answer</Label>
                    <Input
                      id={`qna-answer-${idx}`}
                      name="answer"
                      className="text-sm text-gray-600 dark:text-gray-300 mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      value={item.answer}
                      onChange={e => handleChange(idx, 'answer', e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-3 min-w-[100px]">
                    <Switch
                      checked={item.active}
                      onCheckedChange={() => handleToggle(idx)}
                      size="sm"
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.active ? 'Active' : 'Inactive'}</span>
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
          {error && <div className="text-red-500 dark:text-red-400 text-center mt-2">{error}</div>}
        </CardContent>
      </Card>
    </div>
  );
}
  