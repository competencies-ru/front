module.exports = {
  presets: ['@babel/preset-env', "@babel/preset-react", "@babel/preset-typescript"],
  // plugins: ['effector-logger/babel-plugin', ['effector/babel-plugin', {
  //   addLoc: true,
  //   addNames: true,
  //   importName: ['effector', 'effector/compat']
  // }]]
  plugins: [['effector/babel-plugin', {
    addLoc: true,
    addNames: true,
    importName: ['effector', 'effector/compat']
  }]]
};
