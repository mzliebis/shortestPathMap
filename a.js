var canvas;
var ctx;
var width = 700;
var height = 700;


var c = document.getElementById("canvas");
var ctx = c.getContext("2d");




//global variable
var toggle_start_selected =0;
var toggle_end_selected =0;

var colorVertices="grey";
var colorStartPt="green";
var colorEndPt="red";
var colorEdges="yellow";
var colorPath="black";

// vertex object
function vertex(n,x,y,e,v) {
    this.number=n
    this.xcoord = x;
    this.ycoord = y;
    this.edges = e;
    this.visability=v;
    //this.anothercolor=q;
    
    this.drawVertex = function(c){
        if (this.visability == 1){
            ctx.beginPath();
            ctx.arc(this.xcoord, this.ycoord, 5, 0, Math.PI*2, true);
            ctx.fillStyle = c;
            ctx.fill();
        }
        //if (this.anothercolor == 1)
        //{ var colorVertices="grey";}
        
    }
}


// graph object and methods
function graph(v){
  this.vertices=v;
  
  
	this.drawVertices = function(){
  		for (var i =0;i<(this.vertices.length);i++){
      		this.vertices[i].drawVertex(colorVertices);
    	}
	}
    
	this.drawEdge = function(n1,n2,c){
		var x1,y1,x2,y2
		x1=this.vertices[n1].xcoord;
		y1=this.vertices[n1].ycoord;
		x2=this.vertices[n2].xcoord;
		y2=this.vertices[n2].ycoord
	
		ctx.moveTo(x1,y1);
    	ctx.lineTo(x2,y2);
    	ctx.strokeStyle=c;
    	ctx.stroke();
  	 
    }
    
    this.drawEdges = function(){
		var n1,n2;
		for (var i=0;i<this.vertices.length;i++){
			for (var j=0;j<this.vertices[i].edges.length;j++){
				n1 = i;
				n2 =this.vertices[i].edges[j];
				
				if (n1<n2){
					this.drawEdge(n1,n2,colorEdges);
				}
			}
    	}	 
 	}
  
  
  
  this.distance = function(v1,v2){
   return Math.sqrt(Math.pow(this.vertices[v1].xcoord-this.vertices[v2].xcoord,2)+Math.pow(this.vertices[v1].ycoord-this.vertices[v2].ycoord,2));
  };
  
  this.drawPath = function(s,e){
    
    var c; // current node processing
    var holding =[];// this will hold previous vertex and path length
    var stack =[s];
    var n;
    var d;
    var p=[]; //final path of nodes traveled
    var temp;
    
    for (var i =0;i<(this.vertices.length);i++){
      holding.push([-99,Infinity]);
    }
    holding[s][1]=0; //
    holding[s][0]=s;
    
    
  
    
    while(stack.length>0){ 
      c = stack.shift()
      for (i=0;i<(this.vertices[c].edges.length);i++){
          n =this.vertices[c].edges[i];
          d =this.distance(c,n);
          if (holding[c][1]+d< holding[n][1]){
                holding[n][1]=holding[c][1]+d;
           		holding[n][0]=c;
           		stack.push(n)
           }
      }
    }
    
    
    // get the path from start to end in order
  	temp= e;
	while (temp != s){
    	p.unshift(temp);
    	temp=holding[temp][0];
  	}
  	p.unshift(s); 
  	
  	
  	//draw edges
  	//document.write(p);
  	 for (i=0;i<(p.length-1);i++){
  	 	this.drawEdge(p[i],p[i+1],colorPath);


  	 
  	 
  	 }
   
  }
  
  

}


//------------------------------------------------------------------------------------------------------------//
// html callback functions

function calcStartPt() {
  var p,n;
  	
    p = document.getElementById("startPt");
   	n = p.options[p.selectedIndex].value;
	g1.drawEdges();
	g1.drawVertices();
	g1.vertices[n].drawVertex(colorStartPt);
    toggle_start_selected =1;
    toggle_end_selected =0;
  
}


function calcEndPt() {
   
 
   	var n1,n2;
    if(toggle_start_selected==1){
    
    	 p = document.getElementById("startPt");
   		 n1 = p.options[p.selectedIndex].value;
    	
   		
   		 p = document.getElementById("endPt");
   		 n2 = p.options[p.selectedIndex].value;
    
    	if (n1==n2){
    		window.alert("start and end point cannot be the same")
    	}else{ 
    		g1.drawEdges();
			g1.drawVertices();
			g1.vertices[n1].drawVertex(colorStartPt);
			g1.vertices[n2].drawVertex(colorEndPt)
    		toggle_end_selected =1;
    		
    	}
    
     }else{
     
     
    	window.alert("need to select start pt first")
    
    }
     
     
  
}

function calcPath(){

		if(toggle_start_selected==1 && toggle_end_selected==1){
		p = document.getElementById("startPt");
   		n1 = p.options[p.selectedIndex].value;
   		
   		p = document.getElementById("endPt");
   		n2 = p.options[p.selectedIndex].value;
   		
   		
   		
   
   		g1.drawPath(n1,n2);
		g1.vertices[n1].drawVertex(colorStartPt);
		g1.vertices[n2].drawVertex(colorEndPt)
   		
   		
   		
   		}else{
   		
   			window.alert("need to select start and end pts first");
   		
   		
   		}
   		  
  
}





//------------------------------------------------------------------------------------------------------------//
// set up graph

var temp = [];


temp.push(new vertex(0,1000,425,[1,18,26],1));
temp.push(new vertex(1,950,425,[0,17,24],1));
temp.push(new vertex(2,1155,390,[11,27],1));
temp.push(new vertex(3,990,290,[4,25],1));
temp.push(new vertex(4,980,260,[3,14,15]));
temp.push(new vertex(5,1080,635,[48,50],1));
temp.push(new vertex(6,718,700,[7,53,55],1));
temp.push(new vertex(7,718,800,[6,54,77],1));
temp.push(new vertex(8,718,950,[10,56,77],1));
temp.push(new vertex(9,1085,905,[60,61],1));
temp.push(new vertex(10,718,1040,[8,57,81],1));

temp.push(new vertex(11,1173,390,[2,12]));
temp.push(new vertex(12,1173,260,[11,13]));
temp.push(new vertex(13,1153,250,[12,14]));
temp.push(new vertex(14,1000,250,[4,13]));
temp.push(new vertex(15,740,390,[4,16]));

temp.push(new vertex(16,740,490,[15,17,23]));
temp.push(new vertex(17,950,490,[1,16,18]));
temp.push(new vertex(18,1000,490,[0,17,49]));

temp.push(new vertex(19,1060,340,[26,27],1));
temp.push(new vertex(20,880,380,[24],1));
temp.push(new vertex(21,860,600,[28,48],1));
temp.push(new vertex(22,700,570,[23,28],1));

temp.push(new vertex(23,700,490,[16,22,46]));
temp.push(new vertex(24,950,380,[1,20]));
temp.push(new vertex(25,990,340,[3,26]));
temp.push(new vertex(26,1000,340,[0,19,25]));
temp.push(new vertex(27,1060,390,[2,19]));
temp.push(new vertex(28,700,600,[21,22,37]));

temp.push(new vertex(29,1,1,[30]));//point for 'choose'
temp.push(new vertex(30,1,1,[29]));//point for 'choose'

temp.push(new vertex(31,1085,1155,[59,63],1));
temp.push(new vertex(32,560,1098,[33,78],1));
temp.push(new vertex(33,600,1098,[32,65,70],1));
temp.push(new vertex(34,360,940,[41,66],1));
temp.push(new vertex(35,520,775,[73,74,79],1));
temp.push(new vertex(36,480,790,[73,76],1));
temp.push(new vertex(37,680,600,[28,55],1));
temp.push(new vertex(38,865,855,[60,77],1));
temp.push(new vertex(39,865,1105,[59,81],1));
temp.push(new vertex(40,680,855,[54,56,77],1));
temp.push(new vertex(41,360,858,[34,47,76],1));
temp.push(new vertex(42,360,1113,[75,78],1));

temp.push(new vertex(43,320,430,[79],1));
temp.push(new vertex(44,600,165,[45,46,80],1));
temp.push(new vertex(45,693,165,[44],1));
temp.push(new vertex(46,600,490,[23,44,74],1));
temp.push(new vertex(47,200,858,[41,75],1));
temp.push(new vertex(48,1080,600,[5,21],1));
temp.push(new vertex(49,1130,490,[18,51],1));
temp.push(new vertex(50,1080,680,[5,51,52],1));

temp.push(new vertex(51,1130,680,[49,50,62],1));
temp.push(new vertex(52,760,680,[50,53],1));
temp.push(new vertex(53,760,700,[6,52],1));
temp.push(new vertex(54,680,800,[7,40,55,71],1));
temp.push(new vertex(55,680,700,[6,37,54],1));

temp.push(new vertex(56,680,950,[8,40,57,69],1));
temp.push(new vertex(57,680,1040,[10,56,58,70],1));
temp.push(new vertex(58,680,1105,[57,81],1));
temp.push(new vertex(59,1085,1105,[31,39],1));
temp.push(new vertex(60,1085,855,[9,38],1));

temp.push(new vertex(61,1085,930,[9,62],1));
temp.push(new vertex(62,1130,930,[51,61,64],1));
temp.push(new vertex(63,1085,1180,[31,64,65],1));
temp.push(new vertex(64,1130,1180,[62,63],1));
temp.push(new vertex(65,600,1180,[33,63],1));

temp.push(new vertex(66,360,970,[34,67],1));
temp.push(new vertex(67,600,970,[66,68,69,70],1));
temp.push(new vertex(68,718,970,[8,10,67],1));
temp.push(new vertex(69,600,950,[56,67,72],1));
temp.push(new vertex(70,600,1040,[33,57,67],1));

temp.push(new vertex(71,600,795,[54,72,74],1));
temp.push(new vertex(72,600,855,[69,71],1));
temp.push(new vertex(73,480,775,[35,36],1));
temp.push(new vertex(74,600,775,[35,71],1));
temp.push(new vertex(75,200,1113,[42,47],1));
temp.push(new vertex(76,480,858,[36,41],1));
temp.push(new vertex(77,718,855,[7,8,38,40],1));
temp.push(new vertex(78,360,1098,[32,42],1));
temp.push(new vertex(79,520,430,[35,43,80],1));
temp.push(new vertex(80,520,165,[44,79],1));
temp.push(new vertex(81,718,1105,[10,39,58],1));
temp.push(new vertex(82,600,700,[46,55,74],1));
var g1 = new graph(temp);


g1.drawEdges();
g1.drawVertices();

ctx.save();
















 







