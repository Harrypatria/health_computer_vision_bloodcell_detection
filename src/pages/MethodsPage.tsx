import { Cog, Network, Boxes, Grid3X3, ArrowDownToLine, Gauge } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MethodsPage = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <Cog className="h-4 w-4" />
          <span className="text-sm font-medium">Technical Methodology</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          How <span className="gradient-text">YOLO</span> Works
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A deep dive into the architecture and algorithms behind YOLO object detection
        </p>
      </section>

      {/* Architecture Overview */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5 text-primary" />
            Architecture Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="backbone" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="backbone">Backbone</TabsTrigger>
              <TabsTrigger value="neck">Neck</TabsTrigger>
              <TabsTrigger value="head">Head</TabsTrigger>
            </TabsList>
            <TabsContent value="backbone" className="space-y-4 pt-4">
              <h3 className="font-semibold">Feature Extraction Backbone</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The backbone network extracts features from input images at multiple scales. 
                Modern YOLO versions use CSPDarknet or similar architectures that employ 
                cross-stage partial connections to reduce computational cost while maintaining 
                feature representation quality.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Input Size</p>
                  <p className="font-semibold">640×640 pixels</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Feature Maps</p>
                  <p className="font-semibold">P3, P4, P5</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="neck" className="space-y-4 pt-4">
              <h3 className="font-semibold">Feature Pyramid Network</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The neck component (PANet/FPN) aggregates features from different backbone 
                levels, creating a feature pyramid that enables detection at multiple scales. 
                This is crucial for detecting both small and large objects effectively.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Architecture</p>
                  <p className="font-semibold">PANet + SPP</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Connections</p>
                  <p className="font-semibold">Bi-directional</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="head" className="space-y-4 pt-4">
              <h3 className="font-semibold">Detection Head</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The detection head produces the final predictions. Modern versions like YOLOv10 
                use decoupled heads for classification and regression tasks, and some employ 
                anchor-free approaches for simplified training and faster inference.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Output</p>
                  <p className="font-semibold">Boxes + Classes</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">NMS</p>
                  <p className="font-semibold">Optional (v10+)</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Key Concepts */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Key Concepts</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="glass glass-hover">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-2">
                <Grid3X3 className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base">Grid Division</CardTitle>
              <CardDescription>
                The image is divided into an S×S grid. Each grid cell is responsible for 
                detecting objects whose center falls within that cell.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="glass glass-hover">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-2">
                <Boxes className="h-5 w-5 text-cyan-400" />
              </div>
              <CardTitle className="text-base">Bounding Box Prediction</CardTitle>
              <CardDescription>
                Each cell predicts B bounding boxes with confidence scores and 
                class probabilities for C classes, resulting in S×S×(5B+C) tensor.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="glass glass-hover">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center mb-2">
                <ArrowDownToLine className="h-5 w-5 text-violet-400" />
              </div>
              <CardTitle className="text-base">Non-Maximum Suppression</CardTitle>
              <CardDescription>
                NMS filters overlapping detections, keeping only the highest confidence 
                predictions. YOLOv10 introduces NMS-free training for faster inference.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="glass glass-hover">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center mb-2">
                <Gauge className="h-5 w-5 text-amber-400" />
              </div>
              <CardTitle className="text-base">Confidence Threshold</CardTitle>
              <CardDescription>
                Predictions below a confidence threshold are filtered out, allowing 
                balance between precision and recall based on application needs.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Loss Function */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Loss Function</CardTitle>
          <CardDescription>YOLO uses a multi-part loss function</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <p className="font-mono text-sm text-center text-foreground">
                L = λ<sub>coord</sub> · L<sub>box</sub> + λ<sub>obj</sub> · L<sub>obj</sub> + λ<sub>cls</sub> · L<sub>cls</sub>
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-primary mb-1">Localization Loss</p>
                <p className="text-xs text-muted-foreground">
                  Penalizes errors in bounding box coordinates (x, y, w, h)
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-cyan-400 mb-1">Objectness Loss</p>
                <p className="text-xs text-muted-foreground">
                  Measures confidence that an object exists in the box
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-violet-400 mb-1">Classification Loss</p>
                <p className="text-xs text-muted-foreground">
                  Cross-entropy loss for predicted class probabilities
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Comparison */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Model Variants</CardTitle>
          <CardDescription>Choose based on your speed/accuracy requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium">Model</th>
                  <th className="text-left py-3 px-2 font-medium">Size</th>
                  <th className="text-left py-3 px-2 font-medium">mAP<sup>val</sup></th>
                  <th className="text-left py-3 px-2 font-medium">Speed (ms)</th>
                  <th className="text-left py-3 px-2 font-medium">Params</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2">YOLOv10n</td>
                  <td className="py-3 px-2">Nano</td>
                  <td className="py-3 px-2">38.5%</td>
                  <td className="py-3 px-2">1.84</td>
                  <td className="py-3 px-2">2.3M</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2">YOLOv10s</td>
                  <td className="py-3 px-2">Small</td>
                  <td className="py-3 px-2">46.3%</td>
                  <td className="py-3 px-2">2.49</td>
                  <td className="py-3 px-2">7.2M</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2">YOLOv10m</td>
                  <td className="py-3 px-2">Medium</td>
                  <td className="py-3 px-2">51.1%</td>
                  <td className="py-3 px-2">4.74</td>
                  <td className="py-3 px-2">15.4M</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2">YOLOv10l</td>
                  <td className="py-3 px-2">Large</td>
                  <td className="py-3 px-2">53.2%</td>
                  <td className="py-3 px-2">7.28</td>
                  <td className="py-3 px-2">24.4M</td>
                </tr>
                <tr>
                  <td className="py-3 px-2">YOLOv10x</td>
                  <td className="py-3 px-2">XLarge</td>
                  <td className="py-3 px-2">54.4%</td>
                  <td className="py-3 px-2">10.70</td>
                  <td className="py-3 px-2">29.5M</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MethodsPage;
