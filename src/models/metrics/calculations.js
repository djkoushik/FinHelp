// Helper functions for calculating various financial metrics

export const calculateRatios = {
  // Banking sector ratios
  ROA: (netIncome, totalAssets) => (netIncome / totalAssets) * 100,
  ROE: (netIncome, shareholderEquity) => (netIncome / shareholderEquity) * 100,
  NIM: (netInterestIncome, averageEarningAssets) => (netInterestIncome / averageEarningAssets) * 100,
  
  // Common ratios
  PE: (price, eps) => price / eps,
  PB: (price, bookValue) => price / bookValue,
  
  // Manufacturing ratios
  assetTurnover: (sales, averageTotalAssets) => sales / averageTotalAssets,
  currentRatio: (currentAssets, currentLiabilities) => currentAssets / currentLiabilities,
  
  // Tech sector metrics
  revenueGrowth: (currentRevenue, previousRevenue) => 
    ((currentRevenue - previousRevenue) / previousRevenue) * 100,
  
  // FMCG metrics
  grossMargin: (revenue, cogs) => ((revenue - cogs) / revenue) * 100
};

export const analyzeTrend = (historicalData, metric) => {
  // Analyze trends in metrics over time
  // Returns trend analysis with growth rates and patterns
};

export const compareWithPeers = (companyMetrics, peerMetrics, sector) => {
  // Compare company metrics with peer averages
  // Returns comparative analysis
};

export const generateHealthScore = (metrics, sector) => {
  // Generate an overall health score based on sector-specific weightings
  // Returns a score between 0-100 and key observations
};
