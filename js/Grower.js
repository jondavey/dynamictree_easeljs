//Thanks to Kris Temmerman for the original AS3 source
//http://www.neuroproductions.be/experiments/9/
// namespace:
this.cf = this.cf||{};

(function() {

    var Grower = function(stage){
        this.initialize(stage);
    }

    var p = Grower.prototype = new createjs.Container();
    p.Container_initialize = p.initialize;
    p.stage;
    p.branch_arr = [];
    p.cacheCount = 0;
    p.done = false;
    p.cleared = false;
    p.colors = ['#fb0094','#8dc63f','#00bff3','#f7941d','#ffff00'];
    p.randomColor;

    p.initialize = function(stage) {
        
        this.branch_arr = [];
        this.randomColor = this.colors[Math.floor(Math.random() * this.colors.length)]
        this.Container_initialize();
        this.stage = stage;
        this.addBranch(0,0,-3.14/2,10);
        this.cacheCount = 0;

    }
    p.addBranch = function(xPos, yPos, angle, thickness) {
        var branch = new cf.Branch(this)
        branch.thickness = thickness;
        branch.angle = angle
        branch.x =xPos
        branch.y = yPos
        branch.grower = this
        this.branch_arr.push(branch)
        this.addChild(branch)
            
    }
    p.clearAll = function(){
        this.cleared = true;
        var context = this;
        console.log("branch_arr.length:"+this.branch_arr.length)
        for (var i = this.branch_arr.length - 1; i >= 0; i--) {
            context.removeChild(this.branch_arr[i]);
            this.branch_arr[i] = null;
            this.branch_arr.splice(0,1);
        };
    }
    p.remove = function(b) {
        this.branch_arr.splice(this.branch_arr.indexOf(b),1)
        this.stage.removeChild(b)
        b=null
    }
    p.render = function() {
        //console.log(this.cacheCount);
        for (var i = 0; i < this.branch_arr.length;i++ ) {        
           if (this.branch_arr[i].render) {
                this.branch_arr[i].render();
            } else if (!this.branch_arr[i].render && !this.branch_arr[i].cached) {
                this.branch_arr[i].cached = true;
                this.branch_arr[i].cache(-200,-300,400,600);
                this.cacheCount++;
                
                if (this.cacheCount == this.branch_arr.length) {
                    this.done = true;
                }
            }
        }
        //this.stage.update();
    }

    cf.Grower = Grower;
}());