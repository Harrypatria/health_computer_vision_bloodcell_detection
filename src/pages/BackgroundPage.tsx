import { BookOpen, Layers, Zap, Target, Brain, History } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const evolutionTimeline = [
  { version: 'YOLOv1', year: '2015', description: 'Introduced unified detection architecture', author: 'Joseph Redmon' },
  { version: 'YOLOv2', year: '2016', description: 'Added batch normalization, anchor boxes', author: 'Joseph Redmon' },
  { version: 'YOLOv3', year: '2018', description: 'Multi-scale detection, Darknet-53 backbone', author: 'Joseph Redmon' },
  { version: 'YOLOv4', year: '2020', description: 'CSPDarknet, SPP, PANet integration', author: 'Alexey Bochkovskiy' },
  { version: 'YOLOv5', year: '2020', description: 'PyTorch implementation, easy deployment', author: 'Ultralytics' },
  { version: 'YOLOv8', year: '2023', description: 'Anchor-free, improved accuracy/speed', author: 'Ultralytics' },
  { version: 'YOLOv10', year: '2024', description: 'NMS-free training, consistent dual assignments', author: 'Tsinghua University' },
  { version: 'YOLOv11', year: '2024', description: 'Enhanced feature extraction, better efficiency', author: 'Ultralytics' },
];

const BackgroundPage = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <BookOpen className="h-4 w-4" />
          <span className="text-sm font-medium">Background & Introduction</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Understanding <span className="gradient-text">YOLO</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          You Only Look Once — the revolutionary approach to real-time object detection
        </p>
      </section>

      {/* What is YOLO */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            What is YOLO?
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            YOLO (You Only Look Once) is a state-of-the-art, real-time object detection system. 
            Unlike traditional methods that apply classifiers to different parts of an image, 
            YOLO treats object detection as a single regression problem, predicting bounding boxes 
            and class probabilities in a single pass through the neural network.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            This unified approach makes YOLO incredibly fast—capable of processing images at 
            45-155 frames per second while maintaining high accuracy. The model reasons globally 
            about the full image when making predictions, incorporating contextual information 
            from the entire image rather than just local regions.
          </p>
        </CardContent>
      </Card>

      {/* Key Features */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="glass glass-hover">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-2">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base">Real-Time Speed</CardTitle>
              <CardDescription>
                Process images in milliseconds, enabling live video analysis and real-time applications.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="glass glass-hover">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-2">
                <Layers className="h-5 w-5 text-cyan-400" />
              </div>
              <CardTitle className="text-base">End-to-End Learning</CardTitle>
              <CardDescription>
                Single neural network architecture that can be trained end-to-end for optimal performance.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="glass glass-hover">
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center mb-2">
                <Brain className="h-5 w-5 text-violet-400" />
              </div>
              <CardTitle className="text-base">Global Reasoning</CardTitle>
              <CardDescription>
                Considers the entire image context when making predictions, reducing false positives.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Evolution Timeline */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Evolution of YOLO
          </CardTitle>
          <CardDescription>
            From YOLOv1 to the latest versions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-6">
              {evolutionTimeline.map((item, index) => (
                <div key={item.version} className="relative pl-10">
                  <div className="absolute left-2.5 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="text-sm font-mono text-muted-foreground">{item.year}</span>
                    <span className="font-semibold text-primary">{item.version}</span>
                    <span className="text-sm text-muted-foreground hidden sm:inline">•</span>
                    <span className="text-sm text-foreground">{item.description}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">by {item.author}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q1">
              <AccordionTrigger>How does YOLO differ from R-CNN?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                R-CNN and its variants use a two-stage approach: first generating region proposals, 
                then classifying each region. YOLO uses a single-stage approach, processing the 
                entire image in one pass, making it significantly faster while maintaining competitive accuracy.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>What datasets is YOLO trained on?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                YOLO models are typically pre-trained on the COCO (Common Objects in Context) dataset, 
                which contains 80 object categories. The models can be fine-tuned on custom datasets 
                for specific applications.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>Can YOLO detect multiple objects?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, YOLO can detect multiple objects of different classes in a single image. 
                The model divides the image into a grid and predicts bounding boxes and class 
                probabilities for each grid cell simultaneously.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>What are the applications of YOLO?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                YOLO is used in autonomous vehicles, surveillance systems, medical imaging, 
                retail analytics, sports analysis, robotics, and many other domains where 
                real-time object detection is required.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackgroundPage;
