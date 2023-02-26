// JavaScript file implementing your Cube object.  Details of how to create this are discussed in the Modeling section below.

function Cube(gl, vertexShaderId, fragmentShaderId) {
  positions = {
    values: new Float32Array([
      // FRONT FACE
      -0.5,
      -0.5,
      0.5, // 00 -> bottom left
      -0.5,
      0.5,
      0.5, // 01 -> top left
      0.5,
      0.5,
      0.5, // 02 -> top right
      0.5,
      -0.5,
      0.5, // 03 -> bottom right
      // BACK FACE
      -0.5,
      -0.5,
      -0.5, // 04 -> bottom left
      -0.5,
      0.5,
      -0.5, // 05 -> top left
      0.5,
      0.5,
      -0.5, // 06 -> top right
      0.5,
      -0.5,
      -0.5, // 07 -> bottom right
    ]),
    numComponents: 3, // 3 components
  };
  let indices = [
    0,
    3,
    2,
    0,
    2,
    1, // front face
    7,
    4,
    5,
    7,
    5,
    6, // back face
    3,
    7,
    6,
    3,
    6,
    2, // right face
    4,
    0,
    1,
    4,
    1,
    5, // left face
    4,
    7,
    3,
    4,
    3,
    0, // bottom face
    1,
    2,
    6,
    1,
    6,
    5, // top face
  ];

  // Initialize the shader pipeline for this object using either shader ids
  //   declared in the application's HTML header, or use the default names.
  //
  const vertShdr = vertexShaderId || "Cube-vertex-shader";
  const fragShdr = fragmentShaderId || "Cube-fragment-shader";

  // Initialize the object's shader program from the provided vertex
  //   and fragment shaders.  We make the shader program private to
  //   the object for simplicity's sake.
  const shaderProgram = initShaders(gl, vertShdr, fragShdr);

        if (shaderProgram < 0) {
          alert(
            "Error: Cube shader pipeline failed to compile.\n\n" +
              "\tvertex shader id:  \t" +
              vertShdr +
              "\n" +
              "\tfragment shader id:\t" +
              fragShdr +
              "\n"
          );
          return;
        }
    


        aPosition = new Attribute(
          gl,
          shaderProgram,
          positions.values,
          "aPosition",
          3,
          gl.FLOAT
        );
    aColor = new Attribute(
      gl,
      shaderProgram,
      positions.values,
      "aColor",
      3,
      gl.FLOAT
    );
    indices = new Indices(gl, indices);
    let MV = new Uniform(gl, shaderProgram, "MV");

  this.render = function () {
    // Enable our shader program
    gl.useProgram(shaderProgram);

    // Activate our vertex, enabling the vertex attribute we want data
    //   to be read from, and tell WebGL how to decode that data.
    //
      aPosition.enable();
      aColor.enable();

    // Likewise enable our index buffer so we can use it for rendering
    //
      indices.enable();
      
      MV.update(this.MV);

    gl.drawElements(gl.TRIANGLES, indices.count, indices.type, 0);
    // Finally, reset our rendering state so that other objects we
    //   render don't try to use the Cone's data
    //
      aPosition.disable();
      aColor.disable();
      indices.disable();
      
  };
}
