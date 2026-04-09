module.exports = {
  apps: [
    {
      name: 'portfolio-api',
      script: './app.js',
      instances: 4,
      exec_mode: 'cluster',
      autorestart: true,
      watch: ['app.js', 'routes', 'models'],
      ignore_watch: ['node_modules', 'logs'],
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        MONGODB_URI: 'mongodb://localhost:27017/portfolio-dev-naimul'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        MONGODB_URI: 'mongodb://localhost:27017/portfolio-dev-naimul'
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    }
  ]
};