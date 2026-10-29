import { Skill, TargetRole, StudentProfile, Recommendation, SkillQuiz, MentorChatMessage } from '../types';

export const initialSkills: Skill[] = [
  // Data & Analysis
  {
    id: 'skill-data-analysis',
    name: 'Data analysis',
    category: 'AI/ML',
    description: 'Exploratory data analysis, handling missing data, vector transformations, statistical summaries, and hypothesis testing.',
    tags: ['Pandas', 'EDA', 'Data Wrangling', 'Analytics'],
    levelRubrics: {
      1: 'Reads CSV files, prints summary info and column lists.',
      2: 'Performs basic filtering, sorting, handling null values, and summary statistics.',
      3: 'Advanced aggregations, group-by pipelines, merges, pivot tables, and statistical distributions.',
      4: 'Optimizes large dataset processing with Polars/DuckDB, detects outliers, and writes automated pipelines.',
      5: 'Architects enterprise data analytics platforms and production feature stores.'
    }
  },
  {
    id: 'skill-sql',
    name: 'SQL',
    category: 'Programming',
    description: 'Relational database querying, multi-table joins, subqueries, aggregations, window functions, and query optimization.',
    tags: ['PostgreSQL', 'Joins', 'Indexes', 'Queries'],
    levelRubrics: {
      1: 'Basic SELECT, WHERE, and simple column filters.',
      2: 'INNER and LEFT JOINs, GROUP BY, HAVING, and aggregate functions (COUNT, SUM, AVG).',
      3: 'Window functions (ROW_NUMBER, RANK, LAG/LEAD), CTEs (Common Table Expressions), and subqueries.',
      4: 'Query execution plans (EXPLAIN), B-Tree/GIN index tuning, and complex analytical views.',
      5: 'Database sharding, partitioning, database internals, and high-load replication tuning.'
    }
  },
  {
    id: 'skill-analytical-thinking',
    name: 'Analytical thinking',
    category: 'Problem-solving',
    description: 'Structured problem decomposition, root cause analysis, hypothesis generation, and evidence-based decision making.',
    tags: ['Problem Solving', 'Critical Thinking', 'Decomposition'],
    levelRubrics: {
      1: 'Identifies immediate symptoms of problems with guidance.',
      2: 'Breaks down well-defined problems into logical components.',
      3: 'Formulates testable hypotheses, analyzes conflicting data, and provides justified solutions.',
      4: 'Solves ambiguous multi-dimensional system challenges and mentors others on structured thinking.',
      5: 'Drives organization-wide strategy, quantitative models, and root-cause post-mortems.'
    }
  },
  {
    id: 'skill-data-visualization',
    name: 'Data visualization',
    category: 'AI/ML',
    description: 'Communicating quantitative insights through charts, dashboards, storytelling, and visual design standards.',
    tags: ['Tableau', 'PowerBI', 'Matplotlib', 'Dashboards'],
    levelRubrics: {
      1: 'Plots basic bar charts and scatter plots.',
      2: 'Customizes chart labels, palettes, tooltips, and chooses appropriate chart types.',
      3: 'Builds interactive multi-view dashboards with filtering, drill-downs, and KPI cards.',
      4: 'Design systems for business intelligence, human perception ergonomics, and high-density executive reporting.',
      5: 'Publishes award-winning visual journalism and enterprise analytics frameworks.'
    }
  },
  {
    id: 'skill-statistics',
    name: 'Statistics',
    category: 'AI/ML',
    description: 'Probability distributions, central tendency, hypothesis testing, p-values, confidence intervals, and regression modeling.',
    tags: ['Probability', 'Inference', 'Hypothesis Testing'],
    levelRubrics: {
      1: 'Understands mean, median, mode, variance, and standard deviation.',
      2: 'Explains normal distributions, z-scores, and correlation vs causation.',
      3: 'Conducts two-sample t-tests, chi-square tests, A/B testing, and linear regressions.',
      4: 'Multivariate regression, Bayesian inference, sample size determination, and non-parametric statistics.',
      5: 'Theoretical mathematical statistics and bespoke probabilistic modeling.'
    }
  },
  {
    id: 'skill-cpp',
    name: 'C++',
    category: 'Programming',
    description: 'Systems programming, memory management (pointers, references, RAII), OOP, and high-performance algorithms.',
    tags: ['Systems', 'Pointers', 'STL', 'Memory'],
    levelRubrics: {
      1: 'Basic syntax, loops, functions, and standard I/O.',
      2: 'Uses std::vector, std::string, classes, and manual memory management (new/delete).',
      3: 'RAII, smart pointers (unique_ptr, shared_ptr), templates, and STL algorithms.',
      4: 'Move semantics, template metaprogramming, multithreading, and cache-conscious data structures.',
      5: 'Engine development, assembly-level profiling, and compiler optimization flags.'
    }
  },
  {
    id: 'skill-html-css',
    name: 'HTML & CSS',
    category: 'Web development',
    description: 'Semantic markup, modern CSS grid/flexbox, accessibility (WCAG), and responsive layouts.',
    tags: ['Flexbox', 'Grid', 'Accessibility', 'Responsive'],
    levelRubrics: {
      1: 'Basic HTML tags and simple style properties.',
      2: 'Responsive pages with Flexbox, CSS Grid, and media queries.',
      3: 'Modern CSS variables, animations, accessible semantic trees, and fluid layouts.',
      4: 'Design system architecture, eliminates layout shifts (CLS), and cross-browser resilience.',
      5: 'Browser layout engine internals and performance optimization.'
    }
  },
  {
    id: 'skill-react',
    name: 'React.js',
    category: 'Web development',
    description: 'Component-based UI development with modern React hooks, state management, and lifecycle patterns.',
    tags: ['Hooks', 'Virtual DOM', 'Frontend'],
    levelRubrics: {
      1: 'JSX syntax and basic functional component rendering.',
      2: 'State and effects using useState, useEffect, and event handlers.',
      3: 'Custom hooks, Context API, component composition, and API integration.',
      4: 'Performance profiling (useMemo, memo), code splitting, and design system tokens.',
      5: 'Concurrent rendering architecture and custom framework creation.'
    }
  },
  {
    id: 'skill-python',
    name: 'Python',
    category: 'Programming',
    description: 'Object-oriented programming, data structures, list comprehensions, decorators, and scripting.',
    tags: ['Python', 'OOP', 'Scripting', 'Backend'],
    levelRubrics: {
      1: 'Variables, loops, conditionals, and standard functions.',
      2: 'Data structures (lists, dicts, sets), file I/O, and importing third-party libraries.',
      3: 'OOP classes, generators, list comprehensions, decorators, and virtual environments.',
      4: 'AsyncIO concurrency, typing protocols, unit testing with pytest, and packaging.',
      5: 'CPython runtime internals, GIL optimization, and C extensions.'
    }
  },
  {
    id: 'skill-docker',
    name: 'Docker & Containers',
    category: 'Cloud & DevOps',
    description: 'Packaging applications, multi-stage Dockerfiles, image optimization, and Docker Compose.',
    tags: ['Containers', 'Docker', 'Compose'],
    levelRubrics: {
      1: 'Runs containers and pulls images from Docker Hub.',
      2: 'Writes single-stage Dockerfile and maps ports/volumes.',
      3: 'Multi-stage builds, non-root security, healthchecks, and Docker Compose.',
      4: 'Multi-arch builds (buildx), container security scanning, and layer caching.',
      5: 'Custom container runtimes and Kubernetes CRI-O integration.'
    }
  },
  {
    id: 'skill-ml',
    name: 'Machine Learning',
    category: 'AI/ML',
    description: 'Supervised and unsupervised models, scikit-learn, regression, classification, clustering, and cross-validation.',
    tags: ['Scikit-Learn', 'Classification', 'Regression'],
    levelRubrics: {
      1: 'Basic concepts of train/test splits and accuracy metrics.',
      2: 'Builds linear regression and decision tree models using Scikit-Learn.',
      3: 'Feature scaling, cross-validation pipelines, Random Forests, and XGBoost.',
      4: 'Hyperparameter tuning (Optuna), SHAP model interpretability, and imbalanced data handling.',
      5: 'Develops novel algorithms and theoretical loss formulations.'
    }
  },
  {
    id: 'skill-cloud',
    name: 'Cloud Infrastructure (AWS/GCP)',
    category: 'Cloud & DevOps',
    description: 'Compute (EC2/VM), storage (S3), IAM, serverless, networking, and security in public clouds.',
    tags: ['AWS', 'Cloud', 'Serverless'],
    levelRubrics: {
      1: 'Understands cloud tiers and navigates the AWS console.',
      2: 'Provisions virtual servers and configures security groups and buckets.',
      3: 'Serverless deployment with Lambda, API Gateway, and CloudWatch monitoring.',
      4: 'Terraform Infrastructure-as-Code, VPC subnets, and load balancers.',
      5: 'Multi-region enterprise architecture and cloud FinOps.'
    }
  }
];

export const initialRoles: TargetRole[] = [
  {
    id: 'role-data-analyst',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    level: 'Entry level',
    description: 'Turns data into insights with SQL, statistics and visualization.',
    marketDemand: 'High',
    salaryRange: '$72,000 - $96,000',
    topCompanies: ['Spotify', 'McKinsey', 'Target', 'Salesforce'],
    weeksOfLearning: 20,
    responsibilities: [
      'Write complex analytical SQL queries, aggregations, and window functions.',
      'Perform exploratory data analysis and data cleansing using Python and Pandas.',
      'Design interactive executive reports, KPI dashboards, and business insights.',
      'Collaborate with product and operations teams to guide data-driven decisions.'
    ],
    skills: [
      { skillId: 'skill-data-analysis', requiredLevel: 3, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-sql', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-analytical-thinking', requiredLevel: 4, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-data-visualization', requiredLevel: 3, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-statistics', requiredLevel: 3, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-python', requiredLevel: 3, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-html-css', requiredLevel: 2, importance: 'Optional', numericWeight: 2 },
      { skillId: 'skill-cpp', requiredLevel: 1, importance: 'Optional', numericWeight: 1 }
    ]
  },
  {
    id: 'role-ai-ml',
    title: 'AI/ML Engineer',
    category: 'Data & AI',
    level: 'Intermediate',
    description: 'Builds and deploys machine learning systems.',
    marketDemand: 'Very High',
    salaryRange: '$110,000 - $155,000',
    topCompanies: ['OpenAI', 'Anthropic', 'Google', 'NVIDIA'],
    weeksOfLearning: 40,
    responsibilities: [
      'Train, fine-tune, and evaluate deep learning models.',
      'Build end-to-end RAG pipelines and vector search endpoints.',
      'Deploy low-latency inference APIs with Docker and FastAPI.'
    ],
    skills: [
      { skillId: 'skill-python', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-ml', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-statistics', requiredLevel: 4, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-data-analysis', requiredLevel: 4, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-docker', requiredLevel: 3, importance: 'Medium', numericWeight: 3 },
      { skillId: 'skill-sql', requiredLevel: 3, importance: 'Medium', numericWeight: 3 },
      { skillId: 'skill-analytical-thinking', requiredLevel: 4, importance: 'High', numericWeight: 4 }
    ]
  },
  {
    id: 'role-backend-dev',
    title: 'Backend Developer',
    category: 'Backend & Infrastructure',
    level: 'Entry level',
    description: 'Builds server-side logic, APIs and data storage.',
    marketDemand: 'Very High',
    salaryRange: '$82,000 - $115,000',
    topCompanies: ['Amazon', 'Uber', 'Datadog', 'Stripe'],
    weeksOfLearning: 26,
    responsibilities: [
      'Architect robust REST and GraphQL microservices.',
      'Design relational database schemas and write optimized SQL queries.',
      'Containerize applications with Docker and deploy to cloud.'
    ],
    skills: [
      { skillId: 'skill-python', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-sql', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-docker', requiredLevel: 3, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-analytical-thinking', requiredLevel: 3, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-cloud', requiredLevel: 2, importance: 'Medium', numericWeight: 3 }
    ]
  },
  {
    id: 'role-cloud-engineer',
    title: 'Cloud Engineer',
    category: 'Cloud & Infrastructure',
    level: 'Entry level',
    description: 'Builds and operates cloud infrastructure.',
    marketDemand: 'Very High',
    salaryRange: '$88,000 - $122,000',
    topCompanies: ['AWS', 'Google Cloud', 'Cloudflare', 'Microsoft'],
    weeksOfLearning: 28,
    responsibilities: [
      'Automate cloud infrastructure using AWS or GCP.',
      'Configure CI/CD automated deployment pipelines.',
      'Enforce cloud security and networking policies.'
    ],
    skills: [
      { skillId: 'skill-cloud', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-docker', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-python', requiredLevel: 3, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-analytical-thinking', requiredLevel: 3, importance: 'Medium', numericWeight: 3 }
    ]
  },
  {
    id: 'role-cybersecurity',
    title: 'Cybersecurity Analyst',
    category: 'Security',
    level: 'Entry level',
    description: 'Monitors, assesses and defends systems.',
    marketDemand: 'High',
    salaryRange: '$80,000 - $112,000',
    topCompanies: ['CrowdStrike', 'Palo Alto Networks', 'Cisco'],
    weeksOfLearning: 28,
    responsibilities: [
      'Conduct vulnerability scans and threat assessments.',
      'Analyze network traffic logs and defend perimeter.',
      'Enforce security best practices across systems.'
    ],
    skills: [
      { skillId: 'skill-analytical-thinking', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-python', requiredLevel: 3, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-cloud', requiredLevel: 3, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-sql', requiredLevel: 2, importance: 'Medium', numericWeight: 3 }
    ]
  },
  {
    id: 'role-data-scientist',
    title: 'Data Scientist',
    category: 'Data & AI',
    level: 'Intermediate',
    description: 'Builds statistical and machine learning models.',
    marketDemand: 'High',
    salaryRange: '$105,000 - $145,000',
    topCompanies: ['Meta', 'Netflix', 'Airbnb', 'Uber'],
    weeksOfLearning: 36,
    responsibilities: [
      'Formulate business problems as statistical experiments.',
      'Build predictive machine learning models.',
      'Translate data insights into executive roadmaps.'
    ],
    skills: [
      { skillId: 'skill-statistics', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-data-analysis', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-ml', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-sql', requiredLevel: 4, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-python', requiredLevel: 4, importance: 'High', numericWeight: 4 }
    ]
  },
  {
    id: 'role-frontend-dev',
    title: 'Frontend Developer',
    category: 'Web Engineering',
    level: 'Entry level',
    description: 'Builds responsive client-side web applications.',
    marketDemand: 'High',
    salaryRange: '$78,000 - $108,000',
    topCompanies: ['Linear', 'Vercel', 'Shopify', 'Figma'],
    weeksOfLearning: 24,
    responsibilities: [
      'Build modern UI interfaces using React and modern CSS.',
      'Ensure high performance and mobile accessibility.'
    ],
    skills: [
      { skillId: 'skill-react', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-html-css', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-analytical-thinking', requiredLevel: 3, importance: 'Medium', numericWeight: 3 }
    ]
  },
  {
    id: 'role-fullstack',
    title: 'Full-Stack Developer',
    category: 'Web Engineering',
    level: 'Entry level',
    description: 'Builds full web applications end-to-end.',
    marketDemand: 'Very High',
    salaryRange: '$85,000 - $120,000',
    topCompanies: ['Stripe', 'Atlassian', 'GitHub'],
    weeksOfLearning: 32,
    responsibilities: [
      'Design client interfaces and backend microservices.',
      'Manage databases and deploy containers to cloud.'
    ],
    skills: [
      { skillId: 'skill-react', requiredLevel: 3, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-python', requiredLevel: 3, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-sql', requiredLevel: 3, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-docker', requiredLevel: 2, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-html-css', requiredLevel: 3, importance: 'High', numericWeight: 4 }
    ]
  },
  {
    id: 'role-java-dev',
    title: 'Java Developer',
    category: 'Backend & Infrastructure',
    level: 'Entry level',
    description: 'Builds enterprise backend services with Java and Spring.',
    marketDemand: 'High',
    salaryRange: '$84,000 - $116,000',
    topCompanies: ['Oracle', 'JPMorgan', 'IBM', 'Red Hat'],
    weeksOfLearning: 28,
    responsibilities: [
      'Build enterprise APIs with Spring Boot.',
      'Write robust database queries and optimize transactions.'
    ],
    skills: [
      { skillId: 'skill-sql', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-analytical-thinking', requiredLevel: 3, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-docker', requiredLevel: 2, importance: 'Medium', numericWeight: 3 }
    ]
  },
  {
    id: 'role-ux-designer',
    title: 'UX/UI Designer',
    category: 'Product & Design',
    level: 'Entry level',
    description: 'Creates accessible, research-informed digital experiences and interface systems.',
    marketDemand: 'High',
    salaryRange: '$76,000 - $108,000',
    topCompanies: ['Figma', 'Adobe', 'Airbnb', 'Atlassian'],
    weeksOfLearning: 24,
    responsibilities: [
      'Turn customer research and product goals into user flows and interface prototypes.',
      'Design responsive, accessible experiences and reusable interface patterns.',
      'Partner with product managers and engineers to test and refine solutions.'
    ],
    skills: [
      { skillId: 'skill-html-css', requiredLevel: 3, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-analytical-thinking', requiredLevel: 3, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-data-visualization', requiredLevel: 2, importance: 'Medium', numericWeight: 3 },
      { skillId: 'skill-react', requiredLevel: 2, importance: 'Optional', numericWeight: 2 }
    ]
  },
  {
    id: 'role-product-analyst',
    title: 'Product Analyst',
    category: 'Data & Analytics',
    level: 'Entry level',
    description: 'Uses product data and experiments to improve customer experiences.',
    marketDemand: 'High',
    salaryRange: '$82,000 - $114,000',
    topCompanies: ['Spotify', 'Duolingo', 'Atlassian', 'Adobe'],
    weeksOfLearning: 22,
    responsibilities: [
      'Build SQL analyses to understand activation, retention, and feature adoption.',
      'Design and interpret experiments with product and research partners.',
      'Create clear dashboards and recommendations for product teams.'
    ],
    skills: [
      { skillId: 'skill-sql', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-data-analysis', requiredLevel: 3, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-statistics', requiredLevel: 3, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-data-visualization', requiredLevel: 3, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-analytical-thinking', requiredLevel: 4, importance: 'High', numericWeight: 4 }
    ]
  },
  {
    id: 'role-qa-automation',
    title: 'QA Automation Engineer',
    category: 'Quality Engineering',
    level: 'Entry level',
    description: 'Builds reliable test automation to help teams ship quality software.',
    marketDemand: 'High',
    salaryRange: '$78,000 - $112,000',
    topCompanies: ['GitHub', 'Microsoft', 'Shopify', 'Cisco'],
    weeksOfLearning: 24,
    responsibilities: [
      'Create automated tests for web applications and service APIs.',
      'Investigate failures and work with engineers to prevent regressions.',
      'Integrate test suites into continuous delivery workflows.'
    ],
    skills: [
      { skillId: 'skill-python', requiredLevel: 3, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-react', requiredLevel: 2, importance: 'Medium', numericWeight: 3 },
      { skillId: 'skill-html-css', requiredLevel: 2, importance: 'Medium', numericWeight: 3 },
      { skillId: 'skill-sql', requiredLevel: 2, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-analytical-thinking', requiredLevel: 4, importance: 'Critical', numericWeight: 5 }
    ]
  },
  {
    id: 'role-devops-engineer',
    title: 'DevOps Engineer',
    category: 'Cloud & Infrastructure',
    level: 'Intermediate',
    description: 'Automates delivery pipelines and builds dependable cloud platforms.',
    marketDemand: 'Very High',
    salaryRange: '$105,000 - $148,000',
    topCompanies: ['Cloudflare', 'Datadog', 'Amazon', 'GitLab'],
    weeksOfLearning: 34,
    responsibilities: [
      'Build and maintain cloud infrastructure and deployment pipelines.',
      'Automate operational tasks and improve service observability.',
      'Help teams improve reliability, security, and release confidence.'
    ],
    skills: [
      { skillId: 'skill-cloud', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-docker', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-python', requiredLevel: 3, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-sql', requiredLevel: 2, importance: 'Optional', numericWeight: 2 },
      { skillId: 'skill-analytical-thinking', requiredLevel: 4, importance: 'High', numericWeight: 4 }
    ]
  },
  {
    id: 'role-database-admin',
    title: 'Database Administrator',
    category: 'Data & Infrastructure',
    level: 'Intermediate',
    description: 'Keeps production databases secure, available, and performant.',
    marketDemand: 'High',
    salaryRange: '$92,000 - $132,000',
    topCompanies: ['Snowflake', 'Oracle', 'MongoDB', 'Datadog'],
    weeksOfLearning: 30,
    responsibilities: [
      'Monitor database health, backups, access controls, and recovery plans.',
      'Tune queries and indexes to improve application performance.',
      'Support developers with reliable data models and safe migrations.'
    ],
    skills: [
      { skillId: 'skill-sql', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-python', requiredLevel: 3, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-cloud', requiredLevel: 3, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-analytical-thinking', requiredLevel: 4, importance: 'High', numericWeight: 4 }
    ]
  },
  {
    id: 'role-data-engineer',
    title: 'Data Engineer',
    category: 'Data & Infrastructure',
    level: 'Intermediate',
    description: 'Builds dependable data pipelines and platforms for analytics and AI.',
    marketDemand: 'Very High',
    salaryRange: '$108,000 - $150,000',
    topCompanies: ['Snowflake', 'Databricks', 'Uber', 'Netflix'],
    weeksOfLearning: 36,
    responsibilities: [
      'Build batch and streaming pipelines that deliver trusted datasets.',
      'Design cloud data storage and transformation workflows.',
      'Collaborate with analysts and scientists to make data easy to use.'
    ],
    skills: [
      { skillId: 'skill-python', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-sql', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-cloud', requiredLevel: 3, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-data-analysis', requiredLevel: 3, importance: 'Medium', numericWeight: 3 },
      { skillId: 'skill-docker', requiredLevel: 3, importance: 'High', numericWeight: 4 }
    ]
  },
  {
    id: 'role-product-manager',
    title: 'Technical Product Manager',
    category: 'Product & Strategy',
    level: 'Intermediate',
    description: 'Connects customer needs, technical trade-offs, and measurable product outcomes.',
    marketDemand: 'High',
    salaryRange: '$112,000 - $158,000',
    topCompanies: ['Atlassian', 'Stripe', 'Adobe', 'Microsoft'],
    weeksOfLearning: 28,
    responsibilities: [
      'Translate customer needs and strategy into a focused product roadmap.',
      'Work with design and engineering to define scope and launch features.',
      'Use product metrics and experiments to guide prioritization.'
    ],
    skills: [
      { skillId: 'skill-analytical-thinking', requiredLevel: 4, importance: 'Critical', numericWeight: 5 },
      { skillId: 'skill-data-analysis', requiredLevel: 3, importance: 'High', numericWeight: 4 },
      { skillId: 'skill-data-visualization', requiredLevel: 3, importance: 'Medium', numericWeight: 3 },
      { skillId: 'skill-html-css', requiredLevel: 2, importance: 'Optional', numericWeight: 2 },
      { skillId: 'skill-sql', requiredLevel: 2, importance: 'Medium', numericWeight: 3 }
    ]
  }
];

export const initialStudents: StudentProfile[] = [
  // Presetting Raushan matching Screenshot 2, 4, 5
  {
    id: 'student-raushan',
    name: 'Raushan Singh',
    email: 'raushansinghy648@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
    headline: 'Aspiring Data Analyst | Mathematics & Computing Senior',
    university: 'Institute of Applied Sciences',
    major: 'Applied Statistics & Data Science',
    expectedGraduation: 'December 2026',
    targetRoleId: 'role-data-analyst',
    secondaryTargetRoleIds: ['role-data-scientist', 'role-ai-ml'],
    weeklyStudyHours: 5,
    institution: '',
    course: '',
    academicYear: '',
    interests: '',
    careerGoals: '',
    grantedMentors: [],
    skills: [
      { skillId: 'skill-analytical-thinking', proficiency: 2, confidence: 'High', yearsExperience: 2, lastAssessed: '22/10/2026', method: 'Self-assessment' },
      { skillId: 'skill-cpp', proficiency: 2, confidence: 'High', yearsExperience: 1.5, lastAssessed: '22/10/2026', method: 'Self-assessment' },
      { skillId: 'skill-data-analysis', proficiency: 0, confidence: 'Low', yearsExperience: 0.1, lastAssessed: '22/10/2026', method: 'Self-assessment' },
      { skillId: 'skill-data-visualization', proficiency: 1, confidence: 'Low', yearsExperience: 0.4, lastAssessed: '22/10/2026', method: 'Self-assessment' },
      { skillId: 'skill-html-css', proficiency: 3, confidence: 'High', yearsExperience: 2, lastAssessed: '22/10/2026', method: 'Self-assessment' },
      { skillId: 'skill-sql', proficiency: 1, confidence: 'Medium', yearsExperience: 0.8, lastAssessed: '22/10/2026', method: 'Self-assessment' },
      { skillId: 'skill-statistics', proficiency: 0, confidence: 'Low', yearsExperience: 0.2, lastAssessed: '22/10/2026', method: 'Self-assessment' },
      { skillId: 'skill-python', proficiency: 2, confidence: 'Medium', yearsExperience: 1, lastAssessed: '22/10/2026', method: 'Self-assessment' }
    ],
    goals: [
      {
        id: 'goal-r1',
        skillId: 'skill-data-analysis',
        skillName: 'Data analysis',
        title: 'Complete Python & Pandas Data Analysis Bootcamp',
        type: 'course',
        targetDate: '2026-11-20',
        status: 'in_progress',
        progressPercent: 35,
        hoursSpent: 5,
        estimatedHours: 15
      },
      {
        id: 'goal-r2',
        skillId: 'skill-sql',
        skillName: 'SQL',
        title: 'Master Advanced SQL: Window Functions & Joins',
        type: 'project',
        targetDate: '2026-12-05',
        status: 'todo',
        progressPercent: 0,
        hoursSpent: 0,
        estimatedHours: 12
      }
    ],
    historicalReadiness: [
      { date: '2026-09-01', score: 38, roleTitle: 'Data Analyst' },
      { date: '2026-10-01', score: 48, roleTitle: 'Data Analyst' },
      { date: '2026-10-22', score: 56.8, roleTitle: 'Data Analyst' }
    ],
    unlockedBadges: [
      { id: 'b-r1', title: 'Data Explorer', description: 'Started learning path for Data Analyst role.', dateUnlocked: '22/10/2026', icon: 'Target' }
    ]
  },
  {
    id: 'student-sajibur',
    name: 'Sajibur Rahman',
    email: 'sajibur.rahman@student.edu',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    headline: 'Junior CS Major | Aspiring Full Stack & Cloud Developer',
    university: 'State Institute of Technology',
    major: 'Computer Science & Software Engineering',
    expectedGraduation: 'May 2027',
    targetRoleId: 'role-fullstack',
    secondaryTargetRoleIds: ['role-frontend-dev', 'role-backend-dev'],
    weeklyStudyHours: 15,
    grantedMentors: [],
    skills: [
      { skillId: 'skill-react', proficiency: 3, confidence: 'High', yearsExperience: 2, lastAssessed: '2026-10-18', method: 'Self-assessment' },
      { skillId: 'skill-html-css', proficiency: 4, confidence: 'High', yearsExperience: 2.5, lastAssessed: '2026-10-12', method: 'Self-assessment' },
      { skillId: 'skill-python', proficiency: 3, confidence: 'High', yearsExperience: 2, lastAssessed: '2026-10-14', method: 'Self-assessment' },
      { skillId: 'skill-sql', proficiency: 2, confidence: 'Medium', yearsExperience: 0.8, lastAssessed: '2026-10-08', method: 'Self-assessment' },
      { skillId: 'skill-docker', proficiency: 1, confidence: 'Low', yearsExperience: 0.2, lastAssessed: '2026-10-05', method: 'Self-assessment' },
      { skillId: 'skill-analytical-thinking', proficiency: 3, confidence: 'High', yearsExperience: 2, lastAssessed: '2026-10-16', method: 'Self-assessment' }
    ],
    goals: [
      {
        id: 'goal-1',
        skillId: 'skill-docker',
        skillName: 'Docker & Containers',
        title: 'Complete Multi-Service Docker Compose Setup',
        type: 'project',
        targetDate: '2026-11-15',
        status: 'in_progress',
        progressPercent: 65,
        hoursSpent: 7,
        estimatedHours: 10
      }
    ],
    historicalReadiness: [
      { date: '2026-08-01', score: 42, roleTitle: 'Full-Stack Developer' },
      { date: '2026-09-01', score: 54, roleTitle: 'Full-Stack Developer' },
      { date: '2026-10-24', score: 71, roleTitle: 'Full-Stack Developer' }
    ],
    unlockedBadges: [
      { id: 'b-1', title: 'First Gap Closed', description: 'Leveled up a critical skill after completing a learning project.', dateUnlocked: '2026-09-15', icon: 'Award' }
    ]
  }
];

export const initialRecommendations: Recommendation[] = [
  {
    id: 'rec-sql-bootcamp',
    skillId: 'skill-sql',
    skillName: 'SQL',
    title: 'Advanced SQL for Data Analysts: Window Functions & Analytics',
    type: 'course',
    provider: 'freeCodeCamp',
    duration: '10 hours',
    difficulty: 'Intermediate',
    rating: 4.9,
    url: 'https://freecodecamp.org',
    description: 'Master multi-table joins, subqueries, CTEs, window functions (ROW_NUMBER, RANK, DENSE_RANK), and query optimization.',
    targetLevel: 4,
    impact: 'High Impact'
  },
  {
    id: 'rec-data-analysis-proj',
    skillId: 'skill-data-analysis',
    skillName: 'Data analysis',
    title: 'Project: E-Commerce Customer Cohort & Retention Analysis',
    type: 'project',
    provider: 'Aptivance Project Brief',
    duration: '14 hours',
    difficulty: 'Intermediate',
    rating: 4.88,
    url: 'https://github.com',
    description: 'Clean raw transaction logs with Pandas, calculate monthly customer retention cohorts, and compute Customer Lifetime Value (CLV).',
    targetLevel: 3,
    deliverables: [
      'Jupyter notebook with clean Pandas preprocessing pipeline',
      'Cohort heatmap visualizing retention curves',
      'Executive summary memo highlighting top drop-off stages'
    ],
    impact: 'High Impact'
  },
  {
    id: 'rec-data-viz',
    skillId: 'skill-data-visualization',
    skillName: 'Data visualization',
    title: 'Interactive Business Intelligence Dashboard in Tableau',
    type: 'project',
    provider: 'Tableau Public',
    duration: '8 hours',
    difficulty: 'Intermediate',
    rating: 4.85,
    url: 'https://tableau.com',
    description: 'Build a multi-page interactive executive dashboard with dynamic filtering, parameters, and drill-down metrics.',
    targetLevel: 3,
    impact: 'High Impact'
  },
  {
    id: 'rec-stats-course',
    skillId: 'skill-statistics',
    skillName: 'Statistics',
    title: 'Practical Statistics for Data Analysis and A/B Testing',
    type: 'course',
    provider: 'Coursera / Stanford',
    duration: '16 hours',
    difficulty: 'Intermediate',
    rating: 4.92,
    url: 'https://coursera.org',
    description: 'Understand p-values, hypothesis testing, t-tests, confidence intervals, sample sizing, and avoiding false positives in experiments.',
    targetLevel: 3,
    impact: 'High Impact'
  }
];

export const initialQuizzes: SkillQuiz[] = [
  {
    id: 'quiz-sql-1',
    skillId: 'skill-sql',
    skillName: 'SQL',
    category: 'Programming',
    level: 3,
    questionsCount: 4,
    timeMinutes: 8,
    questions: [
      {
        id: 'q1',
        question: 'Which window function calculates a ranking without skipping numbers when ties occur?',
        options: ['RANK()', 'DENSE_RANK()', 'ROW_NUMBER()', 'NTILE()'],
        correctAnswer: 1,
        explanation: 'DENSE_RANK() assigns ranks without gaps between values on ties (e.g., 1, 2, 2, 3).'
      },
      {
        id: 'q2',
        question: 'What is the main purpose of a Common Table Expression (CTE) defined with WITH?',
        options: [
          'To create a permanent indexed table on disk',
          'To define a temporary named result set that can be referenced within a SELECT/INSERT/UPDATE query',
          'To enforce foreign key integrity between two schemas',
          'To execute a background asynchronous trigger'
        ],
        correctAnswer: 1,
        explanation: 'A CTE provides a readable, modular way to write complex subqueries using the WITH keyword.'
      },
      {
        id: 'q3',
        question: 'What happens in a LEFT JOIN when a row from the left table has no matching row in the right table?',
        options: [
          'The row is discarded from the result set',
          'An error is thrown immediately',
          'The row is included with NULL values for all right table columns',
          'The right table row defaults to zero or empty string'
        ],
        correctAnswer: 2,
        explanation: 'LEFT JOIN keeps all rows from the left table and fills non-matching right table columns with NULL.'
      },
      {
        id: 'q4',
        question: 'Which clause is used to filter the output of an aggregate function such as GROUP BY?',
        options: ['WHERE', 'HAVING', 'FILTER BY', 'ORDER BY'],
        correctAnswer: 1,
        explanation: 'The HAVING clause filters groups after aggregation, whereas WHERE filters individual rows before aggregation.'
      }
    ]
  },
  {
    id: 'quiz-data-analysis-1',
    skillId: 'skill-data-analysis',
    skillName: 'Data analysis',
    category: 'AI/ML',
    level: 2,
    questionsCount: 3,
    timeMinutes: 6,
    questions: [
      {
        id: 'da1',
        question: 'In Pandas, which method is best for identifying the number of missing values per column?',
        options: ['df.isna().sum()', 'df.count()', 'df.info(nulls=True)', 'df.drop_duplicates()'],
        correctAnswer: 0,
        explanation: 'df.isna().sum() returns the count of NaN/null values for each column in the DataFrame.'
      },
      {
        id: 'da2',
        question: 'What is the key difference between iloc and loc in Pandas?',
        options: [
          'loc is label-based, while iloc is integer position-based',
          'iloc is label-based, while loc is integer position-based',
          'loc is only for series, while iloc is for dataframes',
          'There is no difference'
        ],
        correctAnswer: 0,
        explanation: 'loc selects by index/column names (labels), while iloc selects by zero-indexed integer offsets.'
      },
      {
        id: 'da3',
        question: 'Which metric is least affected by extreme outliers in a skewed numerical dataset?',
        options: ['Mean', 'Median', 'Standard Deviation', 'Range'],
        correctAnswer: 1,
        explanation: 'The median represents the 50th percentile and is robust against extreme outliers compared to the arithmetic mean.'
      }
    ]
  },
  {
    id: 'quiz-python-1',
    skillId: 'skill-python',
    skillName: 'Python',
    category: 'Programming',
    level: 2,
    questionsCount: 4,
    timeMinutes: 8,
    questions: [
      {
        id: 'py1',
        question: 'What does a Python dictionary store?',
        options: ['Ordered numeric values only', 'Key-value pairs', 'Unique values without labels', 'A sequence of characters'],
        correctAnswer: 1,
        explanation: 'A dictionary maps unique keys to values, making it useful for labeled lookups.'
      },
      {
        id: 'py2',
        question: 'Which expression creates a new list containing only even numbers from values?',
        options: ['[n for n in values if n % 2 == 0]', '[n if n % 2 for n in values]', 'values.filter(even)', 'even(values)'],
        correctAnswer: 0,
        explanation: 'A list comprehension iterates over the values and includes an item when its condition is true.'
      },
      {
        id: 'py3',
        question: 'Why use a with statement when opening a file?',
        options: ['It sorts file contents automatically', 'It closes the file when the block exits', 'It converts the file to JSON', 'It prevents all read errors'],
        correctAnswer: 1,
        explanation: 'The context manager closes the file reliably, including when an exception occurs.'
      },
      {
        id: 'py4',
        question: 'What does a function return when it reaches the end without a return statement?',
        options: ['0', 'An empty string', 'None', 'False'],
        correctAnswer: 2,
        explanation: 'Python functions return None when no explicit return value is provided.'
      }
    ]
  },
  {
    id: 'quiz-react-1',
    skillId: 'skill-react',
    skillName: 'React.js',
    category: 'Web development',
    level: 2,
    questionsCount: 4,
    timeMinutes: 8,
    questions: [
      {
        id: 're1',
        question: 'What should a React component use to retain a value between renders and update the UI when it changes?',
        options: ['A local variable', 'useState', 'A CSS class', 'console.log'],
        correctAnswer: 1,
        explanation: 'State created with useState is retained across renders, and its setter schedules an update.'
      },
      {
        id: 're2',
        question: 'Why should list items have a stable key?',
        options: ['To help React track items across renders', 'To make text bold', 'To prevent event handlers', 'To sort the list alphabetically'],
        correctAnswer: 0,
        explanation: 'Stable keys help React identify which list items were added, removed, or reordered.'
      },
      {
        id: 're3',
        question: 'How does a child component typically receive data from its parent?',
        options: ['Through props', 'Through the browser URL only', 'Through CSS selectors', 'Through a return statement'],
        correctAnswer: 0,
        explanation: 'Props are the standard way for a parent to pass data and callbacks to a child.'
      },
      {
        id: 're4',
        question: 'When should an effect cleanup function run?',
        options: ['Before the effect re-runs and when the component unmounts', 'Only after a button click', 'Before the first render', 'Only when state is empty'],
        correctAnswer: 0,
        explanation: 'Cleanup releases subscriptions or other resources before the effect is repeated and on unmount.'
      }
    ]
  },
  {
    id: 'quiz-statistics-1',
    skillId: 'skill-statistics',
    skillName: 'Statistics',
    category: 'AI/ML',
    level: 3,
    questionsCount: 4,
    timeMinutes: 8,
    questions: [
      {
        id: 'st1',
        question: 'What does a 95% confidence interval mean in repeated sampling?',
        options: ['95% of observations lie inside this one interval', 'About 95% of intervals made this way would contain the true parameter', 'The parameter changes 95% of the time', 'There is a 95% chance the sample mean is correct'],
        correctAnswer: 1,
        explanation: 'The confidence level describes the long-run coverage of the interval procedure.'
      },
      {
        id: 'st2',
        question: 'A p-value is the probability of what, assuming the null hypothesis is true?',
        options: ['Observing results at least as extreme as those seen', 'The null hypothesis being correct', 'The alternative hypothesis being correct', 'A large effect occurring'],
        correctAnswer: 0,
        explanation: 'A p-value measures how surprising the data (or more extreme data) would be under the null model.'
      },
      {
        id: 'st3',
        question: 'Why randomize users between control and treatment groups in an experiment?',
        options: ['To make every outcome identical', 'To reduce systematic differences between groups', 'To guarantee statistical significance', 'To increase the sample mean'],
        correctAnswer: 1,
        explanation: 'Random assignment helps balance confounding factors on average, supporting causal comparisons.'
      },
      {
        id: 'st4',
        question: 'Which measure of center is generally more robust to extreme outliers?',
        options: ['Arithmetic mean', 'Median', 'Range', 'Variance'],
        correctAnswer: 1,
        explanation: 'The median depends on rank rather than the magnitude of extreme values.'
      }
    ]
  },
  {
    id: 'quiz-data-viz-1',
    skillId: 'skill-data-visualization',
    skillName: 'Data visualization',
    category: 'AI/ML',
    level: 2,
    questionsCount: 4,
    timeMinutes: 8,
    questions: [
      {
        id: 'dv1',
        question: 'Which chart is usually best for showing a trend over time?',
        options: ['Line chart', 'Pie chart', 'Word cloud', 'Single-value gauge'],
        correctAnswer: 0,
        explanation: 'A line chart makes the sequence and direction of change across time easy to see.'
      },
      {
        id: 'dv2',
        question: 'What is a good first step when choosing a chart?',
        options: ['Pick the most colorful chart', 'Identify the comparison or question the viewer needs to answer', 'Use a 3D chart', 'Add every available data field'],
        correctAnswer: 1,
        explanation: 'Start with the analytical task, then choose an encoding that makes that task clear.'
      },
      {
        id: 'dv3',
        question: 'Why should a bar chart baseline usually start at zero?',
        options: ['To make labels shorter', 'Because bar length encodes magnitude and a truncated baseline can distort differences', 'To show a trend line', 'Because zero is always the average'],
        correctAnswer: 1,
        explanation: 'A zero baseline preserves the visual proportion represented by bar lengths.'
      },
      {
        id: 'dv4',
        question: 'Which practice improves accessibility for viewers with color-vision differences?',
        options: ['Use color as the only distinction', 'Pair color with labels, patterns, or shapes', 'Use only pale gray text', 'Remove chart labels'],
        correctAnswer: 1,
        explanation: 'Redundant visual cues make chart meaning available beyond color alone.'
      }
    ]
  },
  {
    id: 'quiz-docker-1',
    skillId: 'skill-docker',
    skillName: 'Docker & Containers',
    category: 'Cloud & DevOps',
    level: 3,
    questionsCount: 4,
    timeMinutes: 8,
    questions: [
      {
        id: 'dk1',
        question: 'What is the primary purpose of a Docker image?',
        options: ['A running process on the host', 'A read-only template used to create containers', 'A cloud account', 'A network firewall rule'],
        correctAnswer: 1,
        explanation: 'An image packages the filesystem and configuration from which containers are created.'
      },
      {
        id: 'dk2',
        question: 'What does a multi-stage build help you do?',
        options: ['Keep build tools out of the final runtime image', 'Run one container on several ports automatically', 'Skip dependency installation', 'Share host credentials with every layer'],
        correctAnswer: 0,
        explanation: 'Multi-stage builds copy only required outputs into a smaller final image.'
      },
      {
        id: 'dk3',
        question: 'Why should a production container avoid running as root when possible?',
        options: ['It improves font rendering', 'It limits privileges if the application is compromised', 'It makes images larger', 'It disables application logs'],
        correctAnswer: 1,
        explanation: 'A non-root process has fewer privileges, reducing the potential impact of a compromise.'
      },
      {
        id: 'dk4',
        question: 'What is the role of a health check?',
        options: ['To report whether the containerized service is functioning', 'To rebuild the image on every request', 'To encrypt all environment variables', 'To publish the image publicly'],
        correctAnswer: 0,
        explanation: 'A health check gives the runtime a signal about application health beyond process existence.'
      }
    ]
  },
  {
    id: 'quiz-ml-1',
    skillId: 'skill-ml',
    skillName: 'Machine Learning',
    category: 'AI/ML',
    level: 3,
    questionsCount: 4,
    timeMinutes: 8,
    questions: [
      {
        id: 'ml1',
        question: 'Why keep a test set separate from training data?',
        options: ['To evaluate generalization on data not used to fit the model', 'To increase the number of model parameters', 'To remove all noisy features', 'To guarantee a perfect score'],
        correctAnswer: 0,
        explanation: 'A held-out test set provides a less biased estimate of performance on unseen examples.'
      },
      {
        id: 'ml2',
        question: 'What is overfitting?',
        options: ['A model performs well on training data but poorly on new data', 'A model has too few training examples to run', 'A feature has no missing values', 'A model uses cross-validation'],
        correctAnswer: 0,
        explanation: 'Overfit models capture training-specific noise and fail to generalize.'
      },
      {
        id: 'ml3',
        question: 'What does cross-validation help estimate?',
        options: ['How model performance varies across data splits', 'The number of database tables', 'The cost of cloud storage', 'Whether labels are unique'],
        correctAnswer: 0,
        explanation: 'Repeated train-validation splits provide a more robust view of expected model performance.'
      },
      {
        id: 'ml4',
        question: 'Which metric is often more informative than accuracy for a highly imbalanced classification problem?',
        options: ['Precision and recall', 'Training-set row count', 'Number of model layers', 'Feature name length'],
        correctAnswer: 0,
        explanation: 'Precision and recall show how well the model handles the positive class when classes are imbalanced.'
      }
    ]
  },
  {
    id: 'quiz-cloud-1',
    skillId: 'skill-cloud',
    skillName: 'Cloud Infrastructure (AWS/GCP)',
    category: 'Cloud & DevOps',
    level: 2,
    questionsCount: 4,
    timeMinutes: 8,
    questions: [
      {
        id: 'cl1',
        question: 'What is the purpose of an identity and access management policy?',
        options: ['To grant identities specific permissions to resources', 'To increase storage capacity', 'To balance CPU load', 'To define a database schema'],
        correctAnswer: 0,
        explanation: 'IAM policies define which actions identities can perform on which resources.'
      },
      {
        id: 'cl2',
        question: 'What is a major benefit of object storage?',
        options: ['Durable storage for large amounts of unstructured data', 'Automatic replacement for every relational database', 'Guaranteed zero latency', 'Running operating system processes'],
        correctAnswer: 0,
        explanation: 'Object storage is designed to store and retrieve durable objects at large scale.'
      },
      {
        id: 'cl3',
        question: 'Why place resources in multiple availability zones?',
        options: ['To reduce dependence on a single data-center location', 'To make credentials public', 'To prevent the need for backups', 'To remove all network latency'],
        correctAnswer: 0,
        explanation: 'Spreading workloads across zones can improve resilience to a zone-level outage.'
      },
      {
        id: 'cl4',
        question: 'What is the principle of least privilege?',
        options: ['Give each identity only the permissions needed for its task', 'Give all users administrator access', 'Use the same password everywhere', 'Disable audit logs'],
        correctAnswer: 0,
        explanation: 'Least privilege limits access to the minimum required for a task.'
      }
    ]
  }
];

export const initialMentorMessages: MentorChatMessage[] = [
  {
    id: 'm1',
    sender: 'mentor',
    text: 'Hello Raushan! I am your AI Career Mentor. I noticed you are targeting Data Analyst and currently have a large gap in Data Analysis (0/3) and SQL (1/4). Would you like a high-yield plan to close these gaps in 4 weeks?',
    timestamp: '10:00 AM',
    suggestedAction: {
      tab: 'gap-analysis',
      label: 'View Current Gaps'
    }
  }
];
