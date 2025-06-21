
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TreePine, Zap, Globe, Award } from 'lucide-react';

const Impact = () => {
  const [co2Saved, setCo2Saved] = useState(0);
  const [treesSaved, setTreesSaved] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  const targetCo2 = 2847; // kg of CO2 saved
  const targetTrees = 127; // equivalent trees
  const ecoScore = 94;

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCo2Saved(Math.floor(targetCo2 * progress));
      setTreesSaved(Math.floor(targetTrees * progress));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimationComplete(true);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [targetCo2, targetTrees]);

  const impactData = [
    {
      title: 'This Month',
      co2: 234,
      trees: 10,
      savings: '$89'
    },
    {
      title: 'This Year',
      co2: 2847,
      trees: 127,
      savings: '$1,247'
    },
    {
      title: 'Lifetime',
      co2: 8542,
      trees: 382,
      savings: '$3,891'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Environmental Impact</h1>
        <p className="text-lg text-gray-600">Your contribution to a greener planet</p>
      </div>

      {/* Eco Score */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Eco-Efficiency Score</h2>
              <div className="flex items-center gap-4">
                <div className="text-6xl font-bold">{ecoScore}</div>
                <div className="text-green-100">
                  <div className="text-lg">Excellent!</div>
                  <div className="text-sm">Top 5% in your area</div>
                </div>
              </div>
            </div>
            <Award className="h-16 w-16 text-green-200" />
          </div>
          <Progress value={ecoScore} className="mt-4 bg-green-400" />
        </CardContent>
      </Card>

      {/* Animated Impact Counters */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="relative overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <Globe className="h-12 w-12 text-blue-500" />
              <div className="text-right">
                <div className="text-sm text-gray-600">CO₂ Emissions Saved</div>
                <div className="text-4xl font-bold text-blue-600">{co2Saved.toLocaleString()}</div>
                <div className="text-lg text-gray-500">kg this year</div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                Equivalent to taking a car off the road for{' '}
                <span className="font-bold">{Math.floor(co2Saved / 4.6)} days</span>
              </p>
            </div>
            
            {animationComplete && (
              <div className="absolute top-4 right-4 animate-bounce">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <TreePine className="h-12 w-12 text-green-500" />
              <div className="text-right">
                <div className="text-sm text-gray-600">Trees Saved Equivalent</div>
                <div className="text-4xl font-bold text-green-600">{treesSaved}</div>
                <div className="text-lg text-gray-500">trees this year</div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                Your solar system produces oxygen equivalent to{' '}
                <span className="font-bold">{treesSaved} mature trees</span>
              </p>
            </div>
            
            {animationComplete && (
              <div className="absolute top-4 right-4 animate-bounce">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Impact Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Impact Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impactData.map((period, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-b from-teal-50 to-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{period.title}</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <span className="font-bold text-blue-600">{period.co2} kg CO₂</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <TreePine className="h-5 w-5 text-green-500" />
                    <span className="font-bold text-green-600">{period.trees} trees</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span className="font-bold text-yellow-600">{period.savings} saved</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environmental Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Your Environmental Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">12,450</div>
              <div className="text-sm text-blue-800">Miles driven offset</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">47</div>
              <div className="text-sm text-green-800">Gallons of gas saved</div>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">2.1</div>
              <div className="text-sm text-yellow-800">Tons of coal avoided</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">96%</div>
              <div className="text-sm text-purple-800">Renewable energy ratio</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Impact;
