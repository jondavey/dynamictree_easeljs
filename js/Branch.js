//Thanks to Kris Temmerman for the original AS3 source
//http://www.neuroproductions.be/experiments/9/

// namespace:
this.cf = this.cf||{};

(function() {
    

   var grower;
   var render = true;
    var cached = false;
    var Branch = function(grower){
       
        this.initialize(grower);
    }
    var p  = Branch.prototype = new createjs.Shape();
    p.Shape_initialize = p.initialize;
    
    p.thickness = 20;
    p.angle = 0;
    p.xPos = 0;
    p.yPos = 0;
    p.oldXPos = 0;
    p.oldYPos = 0;


    p.initialize = function(grower) {
        this.Shape_initialize();
        this.grower = grower;
        //this.graphics.clear();
        this.graphics.moveTo(0,0);
        this.graphics.beginStroke("#332b28").setStrokeStyle(this.thickness,"round");


    }
    p.render = function() {

        this.thickness -= 0.3
        var graphics = this.graphics;
        var length;


        if (this.thickness < 1){
            
            this.render = false;
            setTimeout(function(){
                //this.draw();
                graphics.clear();
            },1000)
            //grower.remove(this)     
            
        }
        if (this.thickness < 1.5){
            //graphics.clear()
            var index = Math.round(Math.random()*5)
            this.graphics.beginFill("#332d28")
            this.graphics.setStrokeStyle(0);
            this.graphics.endStroke();
            this.graphics.drawCircle( -5 + this.xPos + Math.random() * 10, -5 + this.yPos + Math.random() * 10, (Math.random() * 5) + 5)

            remove = true
            this.angle += Math.PI/180*((Math.random()*30)-15);
            length = (Math.random()*8)+4

            this.oldXPos = this.xPos;
            this.oldYPos = this.yPos;
            this.xPos += length*Math.cos(this.angle);
            this.yPos += length*Math.sin(this.angle);
            this.graphics.beginStroke("#332b28");
            this.graphics.setStrokeStyle(this.thickness,"round").moveTo(this.oldXPos,this.oldYPos).lineTo(this.xPos,this.yPos);
            if (Math.round(Math.random() * (length)) ==1){
                this.grower.addBranch(this.x+this.xPos ,this.y+this.yPos, this.angle+((Math.random()-0.5)*2),this.thickness-Math.random()*5)
        
            }
            graphics.lineTo(this.xPos, this.yPos);
        } else {    

            this.angle += Math.PI/180*((Math.random()*14)-7);
            length = (Math.random()*8)+4;
            this.oldXPos = this.xPos;
            this.oldYPos = this.yPos;
            this.xPos += length*Math.cos(this.angle);
            this.yPos += length*Math.sin(this.angle);
            this.graphics.setStrokeStyle(this.thickness,"round").moveTo(this.oldXPos,this.oldYPos).lineTo(this.xPos,this.yPos);

        }

        if (Math.round(Math.random() * (this.thickness/7)) == 1)
        {

            this.grower.addBranch(this.x+this.xPos ,this.y+this.yPos, this.angle+((Math.random()-0.5)*2),this.thickness-Math.random()*5)
        
        }

        
    }

    cf.Branch = Branch;

}());

