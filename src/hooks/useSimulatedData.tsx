import { useState, useEffect } from 'react';

// Types for our data points
export interface DataPoint {
  timestamp: number;
  value: number;
}

export interface PhysiologicalData {
  heartRate: DataPoint[];
  oxygenLevel: DataPoint[];
  bloodPressure: DataPoint[];
  brainActivity: DataPoint[];
}

// Generate a smooth line with random variations between min and max
const generateSmoothData = (
  count: number, 
  min: number, 
  max: number, 
  variationFactor: number
): DataPoint[] => {
  const now = Date.now();
  const result: DataPoint[] = [];
  let value = min + Math.random() * (max - min);

  for (let i = 0; i < count; i++) {
    // Generate a timestamp x minutes in the past
    const timestamp = now - (count - i) * 60 * 1000;
    
    // Add random variation but keep it smooth
    const randomVariation = (Math.random() - 0.5) * variationFactor;
    value = Math.min(max, Math.max(min, value + randomVariation));
    
    result.push({ timestamp, value });
  }

  return result;
};

// Generate an attack pattern at a random point
const generateAttackPattern = (
  data: DataPoint[], 
  attackStrength: number,
  durationMinutes: number
): DataPoint[] => {
  if (data.length < 10) return data;
  
  // Choose a random position for the attack, but not at the very beginning or end
  const attackPosition = Math.floor(data.length * 0.4) + Math.floor(Math.random() * Math.floor(data.length * 0.4));
  const minutesPerPoint = 1; // Assuming one data point per minute
  const pointsForAttack = Math.ceil(durationMinutes / minutesPerPoint);
  
  return data.map((point, index) => {
    // Check if this point is within the attack range
    if (index >= attackPosition && index < attackPosition + pointsForAttack) {
      // Calculate how far into the attack we are (0 to 1)
      const attackProgress = (index - attackPosition) / pointsForAttack;
      
      // Create a bell curve for the attack intensity
      const intensity = Math.sin(attackProgress * Math.PI) * attackStrength;
      
      return {
        timestamp: point.timestamp,
        value: Math.max(0, point.value + intensity)
      };
    }
    return point;
  });
};

export const useSimulatedData = (includeAttack: boolean = false) => {
  const [data, setData] = useState<PhysiologicalData>({
    heartRate: [],
    oxygenLevel: [],
    bloodPressure: [],
    brainActivity: []
  });
  
  useEffect(() => {
    // Generate 60 minutes of data
    let heartRateData = generateSmoothData(60, 60, 80, 2);
    let oxygenLevelData = generateSmoothData(60, 95, 100, 0.5);
    let bloodPressureData = generateSmoothData(60, 110, 130, 3);
    let brainActivityData = generateSmoothData(60, 10, 20, 1);
    
    // Add attack patterns if required
    if (includeAttack) {
      const attackDuration = 5 + Math.floor(Math.random() * 10); // 5-15 minutes
      
      heartRateData = generateAttackPattern(heartRateData, 30, attackDuration);
      oxygenLevelData = generateAttackPattern(oxygenLevelData, -10, attackDuration);
      bloodPressureData = generateAttackPattern(bloodPressureData, 15, attackDuration);
      brainActivityData = generateAttackPattern(brainActivityData, 15, attackDuration);
    }
    
    setData({
      heartRate: heartRateData,
      oxygenLevel: oxygenLevelData,
      bloodPressure: bloodPressureData,
      brainActivity: brainActivityData
    });
  }, [includeAttack]);
  
  return data;
};

// Hook for simulating attack detection
export const useAttackDetection = () => {
  const [hasDetectedAttack, setHasDetectedAttack] = useState(false);
  const [attackTime, setAttackTime] = useState<Date | null>(null);
  
  // Simulate random attack detection within 10-20 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasDetectedAttack(true);
      setAttackTime(new Date());
    }, 10000 + Math.random() * 10000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return { hasDetectedAttack, attackTime };
};
