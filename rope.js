class Rope
  {
    //o construtor recebe quantos seguimentos a corda tem pelo "nlink" e a posição X/Y pelo "pointA"
    constructor(nlink, pointA)
    {
      this.nlink = nlink

  //cria um grupo de "corpos", para depois adicionar colisão em cada um
  const group = Body.nextGroup(true);

  //cria cada vertice da corda separadamente usando retangulos
  const rects = Composites.stack(100, 100, this.nlink, 1, 5, 5, function(x, y) {
      return Bodies.rectangle(x, y, 30, 5, { collisionFilter: { group: group } });
  });
      
  this.pointA = pointA;

  //agrupa cada vertice da corda
  this.body = Composites.chain(rects, 0.1, 0, -0.6, 0, {stiffness: 0.1, length: 0.1, render: {type: 'line'}});
  
  //cria o "mundo" (fisica, etc) 
  World.add(engine.world, this.body);

  //coloca o grupo de vertices no "mundo"
    Composite.add(rects, Constraint.create({
    pointA: this.pointA,
    bodyB: rects.bodies[0],
    pointB: {x: -25, y: 0},
    length:10,
    stiffness: 0.1
  }));
      
    }
    
    break()
    { //Matter.Composite.clear(this.rope,true);
      this.body = null;
    }
    
    show()
    {
      if(this.body!=null)
        {
          //manda cada vertice para a função drawVertices
          for (let i = 0; i < this.body.bodies.length-1; i++)
          {
              this.drawVertices(this.body.bodies[i].vertices);
             }
        }
    }
    //desenha todos os vertices
    drawVertices(vertices) 
    {
      beginShape();
      
      //cor de cada vertice
      fill('#FFF717')

      //sem borda
      noStroke();
      
      //desenha todos vertices
      for (let i = 0; i < vertices.length; i++) 
      {
       vertex(vertices[i].x, vertices[i].y);
       }
      endShape(CLOSE);
   }

   //essa função não é utilizada nesse projeto
   showConstraints(constraints) 
   {
     if(constraints!=null)
     {
    for (let i = 0; i < constraints.length; i++) {
      this.drawConstraint(constraints[i]);
    }
  }
  }

  //essa função não é utilizada nesse projeto
  drawConstraint(constraint) {
    if(constraint!=null)
      {
    const offsetA = constraint.pointA;
    let posA = {x:0, y:0};
    if (constraint.bodyA) {
      posA = constraint.bodyA.position;
    }
    const offsetB = constraint.pointB;
    let posB = {x:0, y:0};
    if (constraint.bodyB) {
      posB = constraint.bodyB.position;
    }
    push()
    strokeWeight(4);
    stroke(255);
    line(
      posA.x + offsetA.x,
      posA.y + offsetA.y,
      posB.x + offsetB.x,
      posB.y + offsetB.y
    );
    pop();
      }
  }  
    
  }