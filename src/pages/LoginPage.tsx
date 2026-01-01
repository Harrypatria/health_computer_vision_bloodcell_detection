import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, Sparkles, Activity, Dna, Brain, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = login(username, password);
    
    if (success) {
      toast.success('Welcome Back', {
        description: 'Initializing clinical workspace...',
      });
      navigate('/dashboard');
    } else {
      toast.error('Authentication Failed', {
        description: 'Invalid credentials. Please contact your administrator.',
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/90 to-primary/5" />
      
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center relative z-10 animate-fade-in p-6">
        
        {/* Left Column: Branding & Info */}
        <div className="space-y-8 lg:pr-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider">
              <Activity className="h-3 w-3" />
              Clinical AI Assistant v2.0
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
              Computer Vision <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">Lab App</span>
            </h1>
            <p className="text-xl text-muted-foreground/80 font-light">
              Advanced Blood Cell Detection & Diagnostics
            </p>
          </div>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
            Leveraging state-of-the-art YOLO architecture for real-time hematological analysis. 
            Automated detection of RBCs, WBCs, and Platelets with generative AI clinical interpretation.
          </p>

          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/60 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Core Capabilities
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl glass border border-white/5 hover:border-primary/20 transition-all group">
                <Dna className="h-6 w-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold mb-1">Cell Detection</h4>
                <p className="text-sm text-muted-foreground">High-precision YOLOv8 inference</p>
              </div>
              <div className="p-4 rounded-xl glass border border-white/5 hover:border-primary/20 transition-all group">
                <Brain className="h-6 w-6 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold mb-1">AI Diagnostics</h4>
                <p className="text-sm text-muted-foreground">Generative clinical reporting</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border/20 flex flex-col sm:flex-row gap-6">
             <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-semibold">Developed By</p>
                <div className="flex items-center gap-3">
                   <div className="bg-gradient-to-br from-primary to-blue-600 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
                     P
                   </div>
                   <div>
                     <h4 className="font-bold text-foreground">Patria & Co.</h4>
                     <p className="text-xs text-muted-foreground">Data, AI & Strategy</p>
                   </div>
                </div>
             </div>
             
             <div className="flex items-center gap-4 mt-2 sm:mt-0">
               <a 
                 href="https://patriaco.co.uk" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
               >
                 Visit Website
                 <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
               </a>
             </div>
          </div>
        </div>

        {/* Right Column: Login Form */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-20" />
          <div className="relative glass rounded-2xl p-8 md:p-10 border border-white/10 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8">
               <div>
                 <h2 className="text-2xl font-bold text-foreground">Sign In</h2>
                 <p className="text-sm text-muted-foreground">Access your clinical dashboard</p>
               </div>
               <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                 <Lock className="h-5 w-5 text-primary" />
               </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Username</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 h-12 bg-white/5 border-white/10 focus:border-primary/50 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 bg-white/5 border-white/10 focus:border-primary/50 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  'Access Workspace'
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
               <p className="text-xs text-muted-foreground">
                 Protected by enterprise-grade security. 
                 <br />
                 Unauthorized access is monitored.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
