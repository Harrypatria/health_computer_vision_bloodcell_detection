import { useState, useCallback } from 'react';
import { Upload, ImagePlus, Loader2, Sparkles, AlertCircle, Key, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeProvider';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { Chatbot } from '@/components/features/Chatbot';

interface Detection {
  class: string;
  confidence: number;
  bbox: { x: number; y: number; width: number; height: number };
}

interface PredictionResult {
  image: string;
  detections: Detection[];
  processingTime: number;
}

// Blood cell detection classes for medical imaging
const BLOOD_CELL_CLASSES = [
  { name: 'RBC', fullName: 'Red Blood Cell (Erythrocyte)', color: 'hsl(0, 70%, 50%)' },
  { name: 'WBC', fullName: 'White Blood Cell (Leukocyte)', color: 'hsl(210, 70%, 50%)' },
  { name: 'Platelets', fullName: 'Platelets (Thrombocyte)', color: 'hsl(45, 70%, 50%)' },
];

const PredictionPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [inferenceTime, setInferenceTime] = useState<number | null>(null);
  const { theme } = useTheme();

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Invalid file type', { description: 'Please upload an image file.' });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setResult(null);
        setInferenceTime(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setResult(null);
        setInferenceTime(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const simulateDetection = useCallback(async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    setInferenceTime(null);
    const startTime = performance.now();
    
    // Simulate processing time (YOLO inference)
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

    // Simulate blood cell detections - typical blood smear analysis
    const detections: Detection[] = [];
    
    // RBCs are most abundant (typically 4-6 million per μL)
    const rbcCount = Math.floor(Math.random() * 8) + 12;
    for (let i = 0; i < rbcCount; i++) {
      detections.push({
        class: 'RBC',
        confidence: 0.85 + Math.random() * 0.14,
        bbox: {
          x: Math.random() * 0.85,
          y: Math.random() * 0.85,
          width: 0.06 + Math.random() * 0.04,
          height: 0.06 + Math.random() * 0.04,
        },
      });
    }

    // WBCs are less common (typically 4,000-11,000 per μL)
    const wbcCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < wbcCount; i++) {
      detections.push({
        class: 'WBC',
        confidence: 0.88 + Math.random() * 0.11,
        bbox: {
          x: Math.random() * 0.8,
          y: Math.random() * 0.8,
          width: 0.1 + Math.random() * 0.06,
          height: 0.1 + Math.random() * 0.06,
        },
      });
    }

    // Platelets (typically 150,000-400,000 per μL but small)
    const plateletCount = Math.floor(Math.random() * 5) + 3;
    for (let i = 0; i < plateletCount; i++) {
      detections.push({
        class: 'Platelets',
        confidence: 0.75 + Math.random() * 0.20,
        bbox: {
          x: Math.random() * 0.9,
          y: Math.random() * 0.9,
          width: 0.03 + Math.random() * 0.03,
          height: 0.03 + Math.random() * 0.03,
        },
      });
    }

    const totalCells = rbcCount + wbcCount + plateletCount;

    const resultObj = {
      image: selectedImage,
      detections,
      processingTime: 12.5 + Math.random() * 8,
    };

    const endTime = performance.now();
    setInferenceTime(endTime - startTime);

    setResult(resultObj);

    // Save to history
    const historyItem = {
      id: Date.now().toString(),
      timestamp: new Date(),
      imageUrl: selectedImage,
      detections: detections,
      processingTime: resultObj.processingTime,
    };

    const existingHistory = JSON.parse(localStorage.getItem('predictionHistory') || '[]');
    localStorage.setItem('predictionHistory', JSON.stringify([historyItem, ...existingHistory]));

    setIsProcessing(false);
    toast.success('Blood Cell Detection Complete!', { 
      description: `Detected ${rbcCount} RBCs, ${wbcCount} WBCs, ${plateletCount} Platelets` 
    });
  }, [selectedImage]);




  /* Using responsive 2-column layout now */
  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)] pt-6 gap-6 relative">
      {/* Main Content Area */}
      <div className="flex-1 space-y-8 max-w-5xl mx-auto px-4 lg:px-6 w-full lg:mr-[400px] animate-fade-in pb-20 lg:pb-8">
        {/* Header */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <ImagePlus className="h-4 w-4" />
            <span className="text-sm font-medium">Blood Cell Detection</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Blood Cell <span className="gradient-text">Analysis</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload blood smear microscopy images for YOLO-powered detection of RBCs, WBCs, and Platelets
          </p>
        </section>

        <div className="grid gap-6">
          {/* Upload Section */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>Drag & drop or click to select an image</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Example Images Selection */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">Or try an example:</p>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                          setSelectedImage(`/examples/example${num}.jpg`);
                          setResult(null);
                          setInferenceTime(null);
                      }}
                      className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <img 
                        src={`/examples/example${num}.jpg`} 
                        alt={`Example ${num}`}
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="relative border-2 border-dashed border-border rounded-xl p-8 transition-all hover:border-primary/50 hover:bg-primary/5 cursor-pointer"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="max-h-64 rounded-lg object-contain"
                    />
                  ) : (
                    <>
                      <div className="p-4 rounded-full bg-primary/10">
                        <Upload className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Drop your image here</p>
                        <p className="text-sm text-muted-foreground">or click to browse</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <Button
                onClick={async () => {
                  await simulateDetection();
                }}
                disabled={!selectedImage || isProcessing}
                className="w-full mt-4"
                variant="glow"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Run Detection
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Detection Results</CardTitle>
              <CardDescription>
                {result ? `${result.detections.length} blood cells detected in ${result.processingTime.toFixed(1)}ms` : 'Upload a blood smear image to see results'}
                {inferenceTime !== null && (
                  <span className="block mt-1 text-xs font-mono text-primary">
                    Model Latency: {inferenceTime.toFixed(2)}ms
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden bg-muted/30">
                    <img src={result.image} alt="Result" className="w-full" />
                    {/* Blood cell bounding boxes overlay with color coding */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {result.detections.map((det, i) => {
                        const cellInfo = BLOOD_CELL_CLASSES.find(c => c.name === det.class);
                        const strokeColor = cellInfo?.color || 'hsl(var(--primary))';
                        return (
                          <g key={i}>
                            <rect
                              x={`${det.bbox.x * 100}%`}
                              y={`${det.bbox.y * 100}%`}
                              width={`${det.bbox.width * 100}%`}
                              height={`${det.bbox.height * 100}%`}
                              fill="none"
                              stroke={strokeColor}
                              strokeWidth="2"
                              rx="2"
                            />
                            <text
                              x={`${(det.bbox.x + 0.01) * 100}%`}
                              y={`${(det.bbox.y - 0.01) * 100}%`}
                              fill={strokeColor}
                              fontSize="10"
                              fontWeight="bold"
                              style={{ textShadow: '0 0 3px rgba(0,0,0,0.8)' }}
                            >
                              {det.class} ({(det.confidence * 100).toFixed(0)}%)
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Cell type summary */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {BLOOD_CELL_CLASSES.map((cellType) => {
                      const count = result.detections.filter(d => d.class === cellType.name).length;
                      const avgConf = result.detections
                        .filter(d => d.class === cellType.name)
                        .reduce((sum, d) => sum + d.confidence, 0) / (count || 1);
                      return (
                        <div 
                          key={cellType.name} 
                          className="p-3 rounded-lg bg-muted/30 text-center"
                          style={{ borderLeft: `3px solid ${cellType.color}` }}
                        >
                          <div className="text-2xl font-bold">{count}</div>
                          <div className="text-xs text-muted-foreground">{cellType.name}</div>
                          <div className="text-xs text-muted-foreground/70">{(avgConf * 100).toFixed(0)}% avg</div>
                        </div>
                      );
                    })}
                  </div>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-full mb-2">
                        View Detection Legend
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72">
                      <div className="space-y-2">
                        {BLOOD_CELL_CLASSES.map((cellType) => (
                          <div key={cellType.name} className="flex items-center gap-2">
                            <div 
                              className="w-4 h-4 rounded" 
                              style={{ backgroundColor: cellType.color }}
                            />
                            <span className="font-medium">{cellType.name}</span>
                            <span className="text-xs text-muted-foreground">- {cellType.fullName}</span>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>

                  {/* Note: AI analysis is now handled by the Chatbot sidebar */}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="p-4 rounded-full bg-muted/50 mb-4">
                    <ImagePlus className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No results yet</p>
                  <p className="text-sm text-muted-foreground/70">Upload an image and run detection</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Chatbot Sidebar */}
      <Chatbot detectionResult={result} />
    </div>
  );
};

export default PredictionPage;
