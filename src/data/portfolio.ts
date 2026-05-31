export const projects = [
  {
    id: 1,
    title: 'Chest X-Ray Pneumonia Detection',
    description:
      'Deep learning model for detecting pneumonia from chest X-ray images using CNNs. Achieved state-of-the-art accuracy on medical imaging classification.',
    tech: ['Python', 'TensorFlow', 'Keras', 'CNN', 'OpenCV', 'Jupyter'],
    stars: 50,
    category: 'Computer Vision',
    categoryColor: '#22d3ee',
    link: 'https://github.com/Saagnik-Mondal/Chest-X-Ray-Images-Pneumonia-',
    featured: true,
    year: '2024',
    problem:
      'Radiologists manually screen thousands of chest X-rays for pneumonia — a slow, fatigue-prone process where early signs are easy to miss, especially in under-resourced clinics.',
    approach:
      'Built a convolutional neural network trained on the labelled chest X-ray dataset, with image augmentation (rotation, zoom, contrast) to fight class imbalance and overfitting, plus transfer learning to converge faster on limited medical data.',
    results: [
      'High classification accuracy distinguishing pneumonia from normal scans',
      'Augmentation pipeline that stabilised training on an imbalanced dataset',
      'Most-starred project at 50★ — used as a reference CNN baseline by others',
    ],
  },
  {
    id: 2,
    title: 'SNEHA — AI Healthcare Assistant',
    description:
      'Offline AI-powered healthcare information assistant providing medical guidance using natural language processing, fully functional without internet connectivity.',
    tech: ['Python', 'NLP', 'NLTK', 'Rule-based AI', 'Healthcare'],
    stars: 0,
    category: 'NLP / Healthcare',
    categoryColor: '#a78bfa',
    link: 'https://github.com/Saagnik-Mondal/SNEHA-An-AI-HealthCare-Assistant',
    featured: true,
    year: '2024',
    problem:
      'Reliable health information is hard to reach where connectivity is poor or absent — exactly where basic medical guidance matters most.',
    approach:
      'Designed an entirely offline NLP assistant: tokenisation and intent matching over a curated medical knowledge base, with a rule-based reasoning layer so it runs fully on-device with no API calls or internet dependency.',
    results: [
      'Works 100% offline — zero network dependency',
      'Natural-language queries mapped to vetted medical responses',
      'Lightweight enough to run on low-spec hardware',
    ],
  },
  {
    id: 3,
    title: 'Chess Engine',
    description:
      'AI-powered chess engine implementing the Minimax algorithm with Alpha-Beta pruning for intelligent, efficient move calculation and game strategy.',
    tech: ['Python', 'Minimax', 'Alpha-Beta Pruning', 'Game AI', 'Pygame'],
    stars: 0,
    category: 'Game AI',
    categoryColor: '#818cf8',
    link: 'https://github.com/Saagnik-Mondal/ChessEngine',
    featured: false,
    year: '2023',
    problem:
      'A naive chess search explodes combinatorially — evaluating every legal line is computationally hopeless beyond a few moves deep.',
    approach:
      'Implemented Minimax with Alpha-Beta pruning to discard branches that cannot affect the outcome, paired with a positional evaluation function scoring material and board control, all wrapped in a Pygame interface.',
    results: [
      'Alpha-Beta pruning cut the search space dramatically vs. plain Minimax',
      'Plays coherent, strategically sound games against a human',
      'Clean separation of search, evaluation, and UI',
    ],
  },
  {
    id: 4,
    title: 'Trikal Drsti',
    description:
      'Applied machine learning project demonstrating practical ML pipeline design, data analysis, and predictive modeling techniques.',
    tech: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
    stars: 0,
    category: 'Machine Learning',
    categoryColor: '#34d399',
    link: 'https://github.com/Saagnik-Mondal/Trikal-Drsti',
    featured: false,
    year: '2023',
    problem:
      'Turning raw, messy data into a trustworthy prediction needs a disciplined end-to-end pipeline — not just a model dropped on top of unprocessed inputs.',
    approach:
      'Built a full ML workflow: exploratory analysis, cleaning and feature engineering with Pandas/NumPy, model training and comparison in scikit-learn, and visual diagnostics with Matplotlib to validate results.',
    results: [
      'Reproducible pipeline from raw data to predictions',
      'Model comparison to select the best performer',
      'Visual diagnostics backing every modelling decision',
    ],
  },
]

export const skills = [
  {
    category: 'AI / Deep Learning',
    icon: '🧠',
    items: [
      { name: 'PyTorch', level: 90 },
      { name: 'TensorFlow', level: 88 },
      { name: 'Keras', level: 85 },
      { name: 'scikit-learn', level: 87 },
      { name: 'Computer Vision', level: 85 },
      { name: 'NLP', level: 78 },
    ],
  },
  {
    category: 'Languages & Data',
    icon: '💻',
    items: [
      { name: 'Python', level: 95 },
      { name: 'NumPy', level: 92 },
      { name: 'Pandas', level: 90 },
      { name: 'Matplotlib', level: 82 },
      { name: 'SQL', level: 72 },
      { name: 'JavaScript', level: 65 },
    ],
  },
  {
    category: 'Tools & Infrastructure',
    icon: '⚙️',
    items: [
      { name: 'Jupyter', level: 90 },
      { name: 'Git / GitHub', level: 85 },
      { name: 'Linux / Bash', level: 78 },
      { name: 'Docker', level: 65 },
      { name: 'VS Code', level: 92 },
      { name: 'Google Colab', level: 88 },
    ],
  },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]
