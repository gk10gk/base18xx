angular.module('railsApp', [])
  .controller('TileListController', function() {
         
    var tileList = this;
    
    this.availableTiles = [
        {tileNr:"tile1", level:LEVEL_YELLOW, smallStation:2, gain:10, connections:["0_sa", "2_sa", "3_sb", "5_sb"],
          elements: [{id:"#circle_0_2"},{id:"#circle_0_2",rotate:3},{id:"#smallstation_v_0"},{id:"#smallstation_v_0",rotate:3}]}
      , {tileNr:"tile2", level:LEVEL_YELLOW, smallStation:2, gain:10, connections:["0_sa", "1_sa", "2_sb", "5_sb"], 
          elements: [{id:"#circle_0_1"},{id:"#track_0_3",rotate:3},{id:"#smallstation_h_0"},{id:"#smallstation_v_0",rotate:5}]}
      , {tileNr:"tile3", level:LEVEL_YELLOW, smallStation:1, gain:10, connections:["0_sa", "1_sa"], 
           elements: [{id:"#circle_0_1"},{id:"#smallstation_h_0"}]}
      , {tileNr:"tile4", level:LEVEL_YELLOW, smallStation:1, gain:10, connections:["0_sa", "3_sa"], 
           elements: [{id:"#track_0_3"},{id:"#smallstation"}]}
      , {tileNr:"tile5", level:LEVEL_YELLOW, bigStation:1, gain:20, connections:["0_SA", "1_SA"], 
           elements: [{id:"#track_0_1"},{id:"#bigstation"}]}
      , {tileNr:"tile6", level:LEVEL_YELLOW, bigStation:1, gain:20, connections:["0_SA", "1_SA"], 
           elements: [{id:"#track_0_2"},{id:"#bigstation"}]}
      , {tileNr:"tile7", level:LEVEL_YELLOW, connections:["0_1"], 
           elements: [{id:"#circle_0_1"}]}
      , {tileNr:"tile8", level:LEVEL_YELLOW, connections:["0_2"], 
           elements: [{id:"#circle_0_2"}]}
      , {tileNr:"tile9", level:LEVEL_YELLOW, connections:["0_3"], 
           elements: [{id:"#track_0_3"}]}
      , {tileNr:"tile12", level:LEVEL_GREEN, bigStation:1, gain:30, connections:["0_SA", "1_SA", "2_SA"], 
           elements: [{id:"#track_0_1"},{id:"#track_0_2"},{id:"#bigstation"}]}
      , {tileNr:"tile13", level:LEVEL_GREEN, bigStation:1, gain:30, connections:["0_SA", "2_SA", "4_SA"], 
           elements: [{id:"#track_0_2"},{id:"#track_0_2",rotate:2},{id:"#bigstation"}]}
      , {tileNr:"tile14", level:LEVEL_GREEN, bigStation:2, gain:30, connections:["0_SA", "2_SA"," 3_SA", "5_SA", "0_SB", "2_SB"," 3_SB", "5_SB"], 
           elements: [{id:"#track_0_3"},{id:"#track_0_3",rotate:2},{id:"#bigstation_2_double"}]}
      , {tileNr:"tile15", level:LEVEL_GREEN, bigStation:2, gain:30, connections:["0_SA", "3_SA", "4_SA", "5_SA", "0_SB", "3_SB", "4_SB", "5_SB"], 
           elements: [{id:"#track_0_3"},{id:"#track_0_1",rotate:4},{id:"#bigstation_2_double_45"}]}
      , {tileNr:"tile21", level:LEVEL_GREEN, connections:["0_1", "3_5"], 
           elements: [{id:"#circle_0_1"},{id:"#circle_0_2",rotate:3}]}
      , {tileNr:"tile19", level:LEVEL_GREEN, connections:["0_3", "2_5"], 
           elements: [{id:"#track_0_3",rotate:2},{id:"#bridge_green_round",rotate:5},{id:"#track_0_3"}]}
      , {tileNr:"tile17", level:LEVEL_GREEN, connections:["0_2", "3_5"], 
           elements: [{id:"#circle_0_2"},{id:"#circle_0_2",rotate:3}]}
      , {tileNr:"tile18", level:LEVEL_GREEN, connections:["0_3", "4_5"], 
           elements: [{id:"#track_0_3"},{id:"#circle_0_1",rotate:5}]}
      , {tileNr:"tile20", level:LEVEL_GREEN, connections:["0_3", "2_5"], 
           elements: [{id:"#track_0_3",rotate:2},{id:"#bridge_green",rotate:5},{id:"#track_0_3"}]}
      , {tileNr:"tile22", level:LEVEL_GREEN, connections:["0_1", "2_4"], 
           elements: [{id:"#circle_0_1"},{id:"#circle_0_2",rotate:2}]}
      , {tileNr:"tile23", level:LEVEL_GREEN, connections:["0_3", "2_3"], 
           elements: [{id:"#track_0_3"},{id:"#circle_0_2",rotate:1}]}
      , {tileNr:"tile24", level:LEVEL_GREEN, connections:["0_2", "0_3"], 
           elements: [{id:"#track_0_2"},{id:"#circle_0_3"}]}
      , {tileNr:"tile25", level:LEVEL_GREEN, connections:["0_2", "2_4"], 
           elements: [{id:"#circle_0_2"},{id:"#circle_0_2",rotate:2}]}
      , {tileNr:"tile26", level:LEVEL_GREEN, connections:["0_3", "2_3"], 
           elements: [{id:"#track_0_3"},{id:"#circle_0_1",rotate:2}]}
      , {tileNr:"tile27", level:LEVEL_GREEN, connections:["0_1", "0_3"], 
           elements: [{id:"#track_0_3"},{id:"#circle_0_1"}]}
      , {tileNr:"tile28", level:LEVEL_GREEN, connections:["0_2", "1_2"], 
           elements: [{id:"#circle_0_1",rotate:1},{id:"#circle_0_2"}]}
      , {tileNr:"tile29", level:LEVEL_GREEN, connections:["0_1", "0_2"], 
           elements: [{id:"#circle_0_1"},{id:"#circle_0_2"}]}
      , {tileNr:"tile30", level:LEVEL_GREEN, connections:["0_2", "2_3"], 
           elements: [{id:"#circle_0_2"},{id:"#circle_0_1",rotate:3}]}
      , {tileNr:"tile31", level:LEVEL_GREEN, connections:["0_1", "1_3"], 
           elements: [{id:"#circle_0_1"},{id:"#circle_0_2",rotate:1}]}
      , {tileNr:"tile52", level:LEVEL_GREEN, bigStation:2, gain:40, connections:["0_SA", "2_SB"], 
           elements: [{id:"#track_zero_2"},{id:"#track_zero_2",rotate:2},{id:"#bigstation_2_single"}]}
      , {tileNr:"tile55", level:LEVEL_YELLOW, smallStation:2, gain:10, connections:["0_sa", "3_sa", "1_sb", "4_sb"], 
           elements: [{id:"#track_0_3",rotate:1},{id:"#smallstation_v_0"},{id:"#bridge_yellow",rotate:5},{id:"#track_0_3"},{id:"#smallstation_v_0",rotate:4}]}
      , {tileNr:"tile87", level:LEVEL_GREEN, connections:["0_sa", "1_sa", "2_sa", "3_sa"], smallStation: 1, gain:10,
           elements: [{id:"#track_0_3"},{id:"#track_0_1",rotate:1}, {id:"#tinystation"}]}
      , {tileNr:"tile88", level:LEVEL_GREEN, connections:["0_sa", "2_sa", "3_sa", "5_sa"], smallStation: 1, gain:10,
           elements: [{id:"#track_0_3"},{id:"#track_0_3",rotate:5}, {id:"#tinystation"}]}
    ];

    this.currentTileIndex = 0;
    
    this.placements = [];
    this.redoPlacements = [];

    tileList.getX = function(placement) {
      return offsetX + (((placement.y+1) % 2) * (nativeSizeX/2)) + (placement.x-1) * nativeSizeX;
    };

    tileList.getY = function(placement) {
      return offsetY + (placement.y-1) * (nativeSizeY - undercutY);
    };

    tileList.getRotate = function(rotate) {
      if (rotate != null && rotate != 0) {
        return "rotate(" + rotate*60 + ")";
      }
      return "";
    };

    tileList.getTransform = function(placement) {
      var x=tileList.getX(placement);
      var y=tileList.getY(placement);
      var tr = "";
      if (placement.rotate != null && placement.rotate != 0) {
        tr = "rotate(" + placement.rotate*60 + "," + x + "," + y + ")";
      }
      tr +=" translate(" + x +","+ y +")";
      tr += " scale(" + scaleX + "," + scaleY + ")";
      return tr;
    };

    tileList.moveCurrentIndex = function (direction) {
      this.currentTileIndex += direction;
      if (this.currentTileIndex >= this.availableTiles.length) {
        this.currentTileIndex = 0;
      }
      else if (this.currentTileIndex < 0) {
        this.currentTileIndex = this.availableTiles.length;
      }
    };

    tileList.findValidTile = function(direction) {
      var oldIndex = this.currentTileIndex;
      var cx = this.currentPlacement.x;
      var cy = this.currentPlacement.y;
      var crotate = this.currentPlacement.rotate;
      var placement = null;
      while (placement==null) {
        var ctile = this.availableTiles[this.currentTileIndex];
        var testPlacement = {
          x: cx,
          y: cy,
          rotate: crotate,
          tile: ctile,
          tileNr: ctile.tileNr
        };
        placement = gameBoard.validateTile(testPlacement);
        if (placement == null) {
          crotate = 0;
          this.moveCurrentIndex(direction);
          if (oldIndex == this.currentTileIndex) {
            this.resetCurrentTile(cx, cy);
            return;
          }
        }
      }

      this.currentPlacement = placement;
    }
    
    tileList.pushCurrentTile = function() {
      if (this.hasCurrentPlacement()) {
        var placement = this.currentPlacement;
        this.placements.push(placement);
        gameBoard.layTile(placement);
        this.resetCurrentTile(placement.x, placement.y);
      }
    }
    
    tileList.showCurrentTile = function() {
      if (!this.hasCurrentPlacement()) {
        this.currentPlacement.tile = this.availableTiles[this.currentTileIndex];
        this.currentPlacement.tileNr = this.currentPlacement.tile;
        this.currentPlacement.rotate = 0;
      }
      this.findValidTile(DIRECTION_UP);
    }

    tileList.hideCurrentTile = function() {
      var placement = this.currentPlacement;
      this.resetCurrentTile(placement.x, placement.y);
    }
    
    tileList.setPosition = function(x,y) {     
      var wasvisible = this.hasCurrentPlacement();
      this.currentPlacement.x = x;
      this.currentPlacement.y = y;
      gameBoard.validatePosition(this.currentPlacement);
      if (wasvisible) {
        this.showCurrentTile();
      }
      else {
        this.hideCurrentTile();
      }
    }

    tileList.left = function() {
      this.setPosition(this.currentPlacement.x-1, this.currentPlacement.y);
    }

    tileList.right = function() {     
      this.setPosition(this.currentPlacement.x+1, this.currentPlacement.y);
    }

    tileList.up = function() {     
      this.setPosition(this.currentPlacement.x - (this.currentPlacement.y % 2), this.currentPlacement.y-1);
    }

    tileList.down = function() {     
      this.setPosition(this.currentPlacement.x  - (this.currentPlacement.y % 2)+1, this.currentPlacement.y+1);
    }

    tileList.keyPress = function(ev) {
      if (ev.key=="a" ) {
        this.left();
      }
      else if (ev.key=="s" ) {
        this.down();
      }
      else if (ev.key=="d" ) {
        this.right();
      }
      else if (ev.key=="w" ) {
        this.up();
      }
      else if (ev.key=="+") {
        this.moveCurrentIndex(DIRECTION_UP);
        this.showCurrentTile();
      }
      else if (ev.key=="-") {
        this.moveCurrentIndex(DIRECTION_DOWN);
        this.showCurrentTile();
      }
      else if (ev.key=="#") {
        if (this.hasCurrentPlacement()) {
          this.currentPlacement.rotate = (this.currentPlacement.rotate == 5 ? 0 : (this.currentPlacement.rotate+1));
          this.currentPlacement = gameBoard.validateTile(this.currentPlacement);
          this.showCurrentTile();
        }
      }
      else if (ev.key=="u") {
        if (this.hasCurrentPlacement()) {
          this.hideCurrentTile();
        }
        else if (this.placements.length > 0) {
          var placement = this.placements.pop();
          gameBoard.removeTile(placement);         
          this.redoPlacements.push(placement);
        }
      }
      else if (ev.key=="r") {
        if (this.hasCurrentPlacement()) {
          this.hideCurrentTile();
        }
        else if (this.redoPlacements.length > 0) {
          var placement = this.redoPlacements.pop();
          gameBoard.layTile(placement);         
          this.placements.push(placement);
        }
      }

      else if (ev.key=="t") {
        if (this.hasCurrentPlacement()) {
          this.pushCurrentTile();
          this.hideCurrentTile();
        }
        else {
          this.showCurrentTile();
        }
      }

      else if (ev.key=="q") {
        this.hideCurrentTile();
      }
    }

    tileList.mousePress = function(ev) {
      this.pushCurrentTile();

      var x = ev.offsetX;
      var y = ev.offsetY;
 
  
      var calcY = y + nativeSizeY + 120;
      var fieldY = Math.floor(calcY / nativeSizeY);
      var calcX = x + nativeSizeX - (((fieldY+1) % 2) * (nativeSizeX/2));
      var fieldX = Math.floor(calcX / nativeSizeX);

      var restX = calcX - fieldX * nativeSizeX;
      var restY = calcY - fieldY * nativeSizeY;
            
      restY -= 75;
      if (restY<0 || (restY<undercutY && restX<restY/3)) {
        //fieldY -= 1;
        if (restX<150) {
          //fieldX -= 1;
        }
      }

      tileList.setPosition(fieldX, fieldY);
      this.showCurrentTile();
    }

    tileList.mouseMove = function(ev) {
      var x = ev.offsetX;
      var y = ev.offsetY;

      var calcY = y + nativeSizeY - 220;
      var fieldY = Math.floor(calcY / nativeSizeY);

      var calcX = x + nativeSizeX - (((fieldY+1) % 2) * (nativeSizeX/2));
      var fieldX = Math.floor(calcX / nativeSizeX);

      this.calcX = x;
      this.calcY = y;

      var restX = calcX - fieldX * nativeSizeX;
      var restY = calcY - fieldY * nativeSizeY;
      
      this.restX = restX;
      this.restY = restY;
      
      restXPart = restX>150 ? 150 - restX : restX;
      if (restY<50 && restXPart<restY/3) {
        //fieldY -= 1;
        if (restX<150) {
          //fieldX -= 1;
        }
      }

      this.fieldX = fieldX;
      this.fieldY = fieldY;
    }

    tileList.getCurrentMouse = function() {
      return this.calcX + "/" + this.calcY + " = " + this.fieldX + "/" + this.fieldY + " (" + this.restX + "/" + this.restY + ")"; 
    }
    
    tileList.hasCurrentPlacement = function() {
      return this.currentPlacement != null && this.currentPlacement.tileNr != EMPTY_TILE_NR;
    }

    tileList.getCurrentPlacement = function() {
      return this.currentPlacement;
    }

    tileList.getCurrentTileRef = function() {
      var ref = (this.hasCurrentPlacement() ? this.nr2Ref(tileList.getCurrentPlacement()) : "#tile_blue");
      return ref;  
    }
    
    tileList.getCurrentTileNr = function() {
      if (this.hasCurrentPlacement()) {
        return this.currentPlacement.tileNr;
      }
      return "#tile_blue";
    }

    tileList.getCurrentTileRotate = function() {
      if (this.hasCurrentPlacement() && this.currentPlacement.rotate != null && this.currentPlacement.rotate != 0) {
        return " * " + this.currentPlacement.rotate * 60;
      }
      return "";
    }

    tileList.getCurrentTileConnections = function() {
      if (this.hasCurrentPlacement() && this.currentPlacement.tile.connections != null) {
        return this.currentPlacement.tile.connections.join(' ');
      }
      return "";
    }

    tileList.resetCurrentTile = function(inX, inY) {
      this.currentPlacement = {tileNr: EMPTY_TILE_NR, tile: EMPTY_TILE, x: inX, y: inY, rotate:0};
      gameBoard.validatePosition(this.currentPlacement);
    } 
    
    tileList.nr2Ref = function(placement) {
      return "#" + (placement == null ? "tile" : placement.tileNr);
    }
    
    tileList.level2Color = function(level) {
      switch(level) {
      case LEVEL_YELLOW:
        return "#tile_yellow";      
      case LEVEL_GREEN:
        return "#tile_green";      
      case LEVEL_BROWN:
        return "#tile_brown";      
      case LEVEL_SILVER:
        return "#tile_silver";      
      }
      return "#tile_base";
    }
    
    tileList.resetCurrentTile(5,5);

  });