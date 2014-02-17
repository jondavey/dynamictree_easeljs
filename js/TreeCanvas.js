// namespace:
this.cf = this.cf||{};

(function() {

    var paused = false;
    var TreeCanvas = function(){
        this.initialize();
    }
    var p = TreeCanvas.prototype;
    p.isMouseDown;
    
    p.tree_arr = [];
    p.stg = null;

    p.initialize = function() {
        this.paused = false;
        p.stg = new createjs.Stage("draw-canvas");
        p.stg.autoClear = true;
        p.stg.onMouseDown = handleMouseDown;
        p.stg.onMouseUp = handleMouseUp;
        createjs.Touch.enable(p.stg);
        p.stg.update();
        createjs.Ticker.addListener(this,p.tick);
    }
    p.addTree = function(){
        p.tree_arr.forEach(function(t){
            // t.scaleX -= .04;
            // t.scaleY -= .04;
            t.alpha -= .04;
        });

        var tree = new cf.Grower(p.stg);
        tree.x = Math.random()* p.stg.canvas.width;
        tree.y = p.stg.canvas.height;
        p.stg.addChild(tree);
        p.tree_arr.push(tree);
        var dist_from_centre = p.stg.canvas.width * .5 - tree.x;
        tree.move_rate = dist_from_centre * .001;

        
    }
    p.stop = function() {
        createjs.Ticker.removeListener(this,p.tick);
    }

    p.tick = function() {
        if (!this.paused) {
            p.tree_arr.forEach(function(t){
                if (t.done == true && !t.cleared){
                    t.cache(-300,-400,600,800);
                    t.clearAll();
                } else if (!t.done){
                    t.render();
                }
                t.scaleX -= .001;
                t.scaleY -= .001;
                t.alpha -= .001;
                t.x += t.move_rate;
                if (t.alpha <= 0){
                    p.stg.removeChild(t);
                    p.tree_arr.splice(p.tree_arr.indexOf(t),1);
                    t = null;
                }
            })
            p.stg.update();
        }
    }

    var handleMouseDown = function() {
        p.isMouseDown = true;

       p.addTree();
    }

    var handleMouseUp = function() {
        p.isMouseDown = false;
    }
    cf.TreeCanvas = TreeCanvas;
}());