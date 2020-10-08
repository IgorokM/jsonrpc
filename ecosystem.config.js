module.exports = {
  apps: [{
    name: 'rpcServer',
    script: 'index.js',
    watch: true,
    env: {
      NODE_ENV: "production",
    },
    instances:'max',
    exec_mode:'cluster'
  }]
};
