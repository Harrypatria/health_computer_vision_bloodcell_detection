import { Eye, ImagePlus, BarChart3, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const stats = [
  { label: 'Model Version', value: 'YOLOv10/v11', description: 'State-of-the-art detection' },
  { label: 'Accuracy', value: '94.2%', description: 'mAP@0.5 on COCO' },
  { label: 'Inference Speed', value: '~5ms', description: 'GPU accelerated' },
  { label: 'Object Classes', value: '80+', description: 'COCO dataset classes' },
];

const quickActions = [
  { 
    icon: ImagePlus, 
    title: 'New Prediction', 
    description: 'Upload an image for object detection',
    href: '/prediction',
    color: 'bg-primary/20 text-primary'
  },
  { 
    icon: BarChart3, 
    title: 'View Results', 
    description: 'Browse your prediction history',
    href: '/results',
    color: 'bg-cyan-500/20 text-cyan-400'
  },
  { 
    icon: Eye, 
    title: 'Learn More', 
    description: 'Understand YOLO methodology',
    href: '/background',
    color: 'bg-violet-500/20 text-violet-400'
  },
];

const DashboardPage = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl glass p-8 md:p-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium">Welcome to YOLO Vision</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Real-Time Object Detection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-6">
            Leverage state-of-the-art YOLO models for instant object detection and analysis. 
            Upload images, get predictions, and receive AI-powered insights.
          </p>
          <Link to="/prediction">
            <Button variant="glow" size="lg" className="gap-2">
              Start Detection
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Grid */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Model Performance</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Tooltip key={stat.label}>
              <TooltipTrigger asChild>
                <Card className="glass glass-hover cursor-default" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader className="pb-2">
                    <CardDescription className="text-xs uppercase tracking-wide">
                      {stat.label}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>{stat.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link 
                key={action.title} 
                to={action.href}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="glass glass-hover h-full group">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-2 transition-transform group-hover:scale-110`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section className="glass rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-3">About This Demo</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This demonstration showcases the capabilities of YOLO (You Only Look Once) 
              object detection models. The platform allows you to upload images and receive 
              real-time predictions with AI-powered analysis and recommendations.
            </p>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-3">Key Features</h2>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Real-time object detection
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                AI-powered result interpretation
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                Professional insights & recommendations
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
