export const sectorMetrics = {
  'banking': {
    name: 'Banking & Finance',
    primaryRatios: {
      'P/B': {
        range: { public: '0.5-2.0x', private: '2.0-4.0x' },
        importance: 'critical',
        description: 'Most critical for banks as book value represents tangible assets'
      },
      'P/E': {
        range: '8-15x',
        importance: 'high',
        description: 'Price to Earnings ratio'
      }
    },
    essentialMetrics: {
      'ROA': { target: '1.5%', description: 'Return on Assets', importance: 'critical' },
      'ROE': { target: '15%', description: 'Return on Equity', importance: 'critical' },
      'NIM': { target: '3-4%', description: 'Net Interest Margin', importance: 'critical' },
      'Credit-to-Deposit': { range: '70-90%', description: 'Liquidity measure' },
      'Gross NPA': { target: '< 3%', description: 'Asset quality indicator', importance: 'critical' },
      'Net NPA': { target: '< 1%', description: 'Net Non-Performing Assets', importance: 'critical' },
      'CAR': { minimum: '11.5%', description: 'Capital Adequacy Ratio', importance: 'regulatory' },
      'PCR': { target: '70%', description: 'Provision Coverage Ratio' },
      'CASA Ratio': { target: '40%+', description: 'Current and Savings Account Ratio', importance: 'high' },
      'Cost-to-Income': { target: '< 50%', description: 'Operating efficiency', importance: 'high' }
    },
    riskMetrics: {
      'Interest Rate Risk': { description: 'Sensitivity to rate changes' },
      'Credit Risk': { description: 'Quality of loan book' },
      'Liquidity Risk': { description: 'Ability to meet obligations' }
    }
  },
  'technology': {
    name: 'Technology',
    primaryRatios: {
      'P/E': {
        range: { established: '15-30x', growth: '30x+' },
        description: 'Most relevant due to asset-light business model',
        importance: 'critical'
      },
      'PEG': {
        target: '< 1.5',
        description: 'P/E divided by growth rate',
        importance: 'high'
      },
      'EV/EBITDA': {
        range: '10-20x',
        description: 'Enterprise Value to EBITDA',
        importance: 'high'
      }
    },
    essentialMetrics: {
      'Revenue Growth': { 
        target: '15-30%', 
        description: 'Year-over-year growth rate',
        importance: 'critical'
      },
      'Gross Margin': {
        target: '60-80%',
        description: 'For software companies',
        importance: 'critical'
      },
      'Operating Margin': { 
        target: '20-30%', 
        description: 'For mature tech companies',
        importance: 'high'
      },
      'R&D Spending': { 
        range: '8-15%', 
        description: 'Of revenue',
        importance: 'high'
      },
      'ARR Growth': {
        target: '20%+',
        description: 'Annual Recurring Revenue growth',
        importance: 'critical for SaaS'
      },
      'Net Revenue Retention': {
        target: '120%+',
        description: 'Expansion from existing customers',
        importance: 'critical for SaaS'
      },
      'CAC Payback': {
        target: '12-18 months',
        description: 'Customer Acquisition Cost recovery period',
        importance: 'high'
      },
      'Customer Concentration': { 
        target: '< 10%', 
        description: 'Per client',
        importance: 'risk factor'
      }
    },
    operationalMetrics: {
      'Attrition Rate': { 
        target: '< 15%',
        description: 'Talent retention indicator' 
      },
      'Employee Productivity': {
        metric: 'Revenue per employee',
        benchmark: 'Industry average'
      },
      'Cloud Gross Margins': {
        target: '65-75%',
        description: 'For cloud services'
      }
    }
  },
  'fmcg': {
    name: 'Fast-Moving Consumer Goods',
    primaryRatios: {
      'P/E': {
        range: '25-50x',
        description: 'Premium valuations justified by consistent growth',
        importance: 'critical'
      },
      'P/S': {
        range: '2-5x',
        description: 'Price to Sales ratio',
        importance: 'high'
      },
      'EV/EBITDA': {
        range: '15-25x',
        description: 'Enterprise Value to EBITDA',
        importance: 'high'
      }
    },
    essentialMetrics: {
      'Revenue Growth': {
        target: '8-15%',
        description: 'Year-over-year sustainable growth',
        importance: 'critical'
      },
      'Gross Margin': {
        target: '50-60%',
        description: 'For premium brands',
        importance: 'critical'
      },
      'Operating Margin': {
        target: '15-25%',
        description: 'Operating efficiency',
        importance: 'high'
      },
      'Working Capital Days': {
        target: 'negative',
        description: 'Cash conversion cycle',
        importance: 'critical'
      },
      'ROCE': {
        target: '25%+',
        description: 'Return on Capital Employed',
        importance: 'high'
      }
    },
    operationalMetrics: {
      'Market Share': {
        description: 'By product category',
        importance: 'critical'
      },
      'Distribution Reach': {
        metric: 'Direct/Indirect coverage',
        importance: 'high'
      },
      'Brand Power': {
        metric: 'Brand equity score',
        importance: 'critical'
      },
      'Innovation Index': {
        metric: 'New product contribution',
        target: '15-20% of revenue'
      }
    },
    riskMetrics: {
      'Raw Material Cost': {
        description: 'Input cost volatility'
      },
      'Brand Concentration': {
        description: 'Revenue from top brands'
      },
      'Geographic Concentration': {
        description: 'Market diversification'
      }
    }
  },
  'manufacturing': {
    name: 'Manufacturing & Industrial',
    primaryRatios: {
      'P/E': { description: 'Important for cyclical earnings assessment' },
      'P/B': { description: 'Relevant due to significant fixed asset base' },
      'EV/EBITDA': { description: 'Useful for capital-intensive businesses' }
    },
    essentialMetrics: {
      'Asset Turnover': { target: '> 1x', description: 'Efficiency in asset utilization' },
      'Capacity Utilization': { target: '80%', description: 'Operational efficiency' },
      'Debt-to-Equity': { target: '< 1.0x', description: 'Capital structure assessment' },
      'Current Ratio': { range: '1.5-3.0x', description: 'Liquidity position' },
      'EBITDA Margin': { description: 'Operational profitability' }
    }
  },
  // Add other sectors similarly...
};

export const getMetricsForSector = (sector) => {
  return sectorMetrics[sector.toLowerCase()] || null;
};

export const analyzeMetrics = (metrics, sector) => {
  const sectorData = getMetricsForSector(sector);
  if (!sectorData) return null;

  const analysis = {
    sector: sectorData.name,
    primaryRatiosAnalysis: {},
    metricsAnalysis: {},
    overallHealth: 'neutral',
    recommendations: []
  };

  // Analyze each metric against sector benchmarks
  // Implementation details...

  return analysis;
};
