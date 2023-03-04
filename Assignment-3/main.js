// your main JavaScript application with your init() and render() functions.

function init() {
  const canvas = document.getElementById("webgl-canvas");
  gl = canvas.getContext("webgl2");
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // DEPTH BUFFERING
  gl.clearDepth(1.0); // default
  gl.enable(gl.DEPTH_TEST);

  // create and link shaders
  const vertexShader = initShaders(
    gl,
    "Cube-vertex-shader",
    "Cube-fragment-shader"
  );
  gl.useProgram(vertexShader);

  // link shader attributes
  cube = new Cube(gl);

  // set up projection matrix
  const aspect = canvas.width / canvas.height;
  const fov = 60; // convert to radians
  const zNear = 2;
  const zFar = 8;
  P = perspective(fov, aspect, zNear, zFar);

  // set up model-view matrix
  const eye = vec3(0.0, 0.0, 3.0);
  const at = vec3(0.0, 0.0, 0.0);
  const up = vec3(0.0, 1.0, 0.0);
  MV = lookAt(eye, at, up);

  // set uniforms
//   const PLoc = gl.getUniformLocation(vertexShader, "P");
//   gl.uniformMatrix4fv(PLoc, false, flatten(P));
//   const MVLoc = gl.getUniformLocation(vertexShader, "MV");
//   gl.uniformMatrix4fv(MVLoc, false, flatten(MV));

  render();
}
var time = 0;

function render() {
  // DEPTH BUFFERING
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // create a matrix stack
    // var ms = new MatrixStack();
    // ms.load();

  // update time
  time += 1;

  // push orignial MV matrix onto stack
//   ms.push(MV);

  // apply rotations using the matrix stack
//   ms.rotate(rotateX(time));
//   ms.rotate(rotateY(time));

//   MV = mult(MV, ms.current());

  // set the cube P and MV matrices
  cube.P = P;
//   cube.MV = MV;
  cube.MV = mult(MV, mult(rotateX(time), rotateY(time)));

  // render the cube
  cube.render();

  // pop the original MV matrix from the stack
//   ms.pop();

  // request the next frame
  requestAnimationFrame(render);
}

window.onload = init;
