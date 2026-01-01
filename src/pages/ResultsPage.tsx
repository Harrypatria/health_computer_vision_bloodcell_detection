import { useState } from 'react';
import { BarChart3, Clock, Image, Trash2, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

interface HistoryItem {
  id: string;
  timestamp: Date;
  imageUrl: string;
  detections: { class: string; confidence: number }[];
  processingTime: number;
}

// Sample history data
const sampleHistory: HistoryItem[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 3600000),
    imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400',
    detections: [
      { class: 'cat', confidence: 0.96 },
      { class: 'sofa', confidence: 0.82 },
    ],
    processingTime: 4.8,
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 7200000),
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    detections: [
      { class: 'car', confidence: 0.94 },
      { class: 'traffic light', confidence: 0.88 },
      { class: 'person', confidence: 0.79 },
    ],
    processingTime: 5.2,
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 10800000),
    imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
    detections: [
      { class: 'dog', confidence: 0.98 },
    ],
    processingTime: 3.9,
  },
];

const ResultsPage = () => {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('predictionHistory');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Fix date objects
        return parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
      } catch (e) {
        console.error("Failed to parse history", e);
        return sampleHistory;
      }
    }
    return sampleHistory;
  });
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  const deleteItem = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem('predictionHistory', JSON.stringify(newHistory));
    toast.success('Item deleted', { description: 'The prediction has been removed from history.' });
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <BarChart3 className="h-4 w-4" />
          <span className="text-sm font-medium">Analysis History</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Prediction <span className="gradient-text">Results</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          View and manage your previous object detection analyses
        </p>
      </section>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text">{history.length}</p>
              <p className="text-sm text-muted-foreground">Total Predictions</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text">
                {history.reduce((sum, item) => sum + item.detections.length, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Objects Detected</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text">
                {(history.reduce((sum, item) => sum + item.processingTime, 0) / history.length || 0).toFixed(1)}ms
              </p>
              <p className="text-sm text-muted-foreground">Avg. Processing</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History List */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Recent Predictions</CardTitle>
          <CardDescription>Click on an item to view details</CardDescription>
        </CardHeader>
        <CardContent>
          {history.length > 0 ? (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                >
                  <img
                    src={item.imageUrl}
                    alt="Prediction"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">
                        {item.detections.length} object{item.detections.length !== 1 ? 's' : ''} detected
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTimestamp(item.timestamp)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.detections.slice(0, 3).map((det, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-full text-xs bg-primary/20 text-primary"
                        >
                          {det.class}
                        </span>
                      ))}
                      {item.detections.length > 3 && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                          +{item.detections.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setSelectedItem(item)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>View details</TooltipContent>
                        </Tooltip>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Detection Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <img
                            src={item.imageUrl}
                            alt="Detection result"
                            className="w-full rounded-lg"
                          />
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="p-3 rounded-lg bg-muted/50">
                              <p className="text-muted-foreground">Processing Time</p>
                              <p className="font-medium">{item.processingTime.toFixed(1)}ms</p>
                            </div>
                            <div className="p-3 rounded-lg bg-muted/50">
                              <p className="text-muted-foreground">Objects Found</p>
                              <p className="font-medium">{item.detections.length}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Detections</p>
                            {item.detections.map((det, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between p-2 rounded bg-muted/30"
                              >
                                <span className="capitalize">{det.class}</span>
                                <span className="text-muted-foreground">
                                  {(det.confidence * 100).toFixed(1)}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 rounded-full bg-muted/50 mb-4">
                <Image className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No predictions yet</p>
              <p className="text-sm text-muted-foreground/70">
                Upload an image to start detecting objects
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsPage;
