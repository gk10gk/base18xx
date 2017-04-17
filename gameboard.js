
var LEVEL_BASE = 0;
var LEVEL_YELLOW = 1;
var LEVEL_GREEN = 2;
var LEVEL_BROWN = 3;
var LEVEL_SILVER = 4;

var DIRECTION_UP = 1;
var DIRECTION_NONE = 0;
var DIRECTION_DOWN = -1;

var EMPTY_TILE_NR = "tile0";
var EMPTY_TILE = {tileNr: EMPTY_TILE_NR};

var offsetX = 150;  
var offsetY = 130;

var sizeX = 173;  
var sizeY = 200;

var scaleX = "1.85";
var scaleY = "1.85";

var undercutY = 45;

var nativeSizeX = Math.floor(330);  
var nativeSizeY = Math.floor(330);

var nativeUndercutY = undercutY * scaleY;


var gameBoard = {};

  gameBoard.lowX = 1;
  gameBoard.highX = 1;
  gameBoard.lowY = 1;
  gameBoard.highY = 1;
  
  gameBoard.validateCoordinate = function (coord,low,high) {
    if (coord < low) {
      return high-1;
    }
    else if (coord > high) {
      return 0;
    }
    return coord;
  }

  
  gameBoard.validatePosition = function (placement) {
    placement.x = this.validateCoordinate(placement.x, gameBoard.lowX, gameBoard.highX);
    placement.y = this.validateCoordinate(placement.y, gameBoard.lowY, gameBoard.highY);
    var distance = 0;
    while (this.getField(placement.x,placement.y)==null) {
      distance++;
      if (this.getField(placement.x-distance,placement.y)) {
        placement.x -= distance;
      }
      else if (this.getField(placement.x+distance,placement.y)) {
        placement.x += distance;
      }
      else if (this.getField(placement.x,placement.y-distance)) {
        placement.y -= distance;
      }
      else if (this.getField(placement.x,placement.y+distance)) {
        placement.y += distance;
      }
      return placement;
    }
    return placement;
  }
  
  gameBoard.validateTile = function (placement) {
    var field = this.getField(placement.x,placement.y);
    var candidate = placement.tile;
    var fieldlevel = ((field.level == null) ? 0 : field.level);
    if (fieldlevel+1 != candidate.level) {
      return null;
    }
    if (field.bigStation != candidate.bigStation || field.smallStation != candidate.smallStation) {
      return null;
    }
    var rotate = (placement.rotate == null ? 0 : placement.rotate);
    var oldRotate = rotate;
    var found = false;
    while(!found) {
      found = true;
      var rcs = this.rotateConnections(candidate.connections, rotate);
      if (field.connections != null) {
        for (var ci = 0; found && candidate != null && ci < field.connections.length; ++ci) {
          if (rcs.indexOf(field.connections[ci]) < 0) {
            rotate = rotate + 1;
            found = false;
            break;
          }
        }
      }
      if (found && field.blockedExits != null) {
        for (var co = 0; found && co < rcs.length; ++co) {
          var pts = this.splitC(rcs[co]);
          if (field.blockedExits.indexOf(pts.start) >= 0 || (pts.station==null && field.blockedExits.indexOf(pts.end) >= 0)) {
            rotate = rotate + 1;
            found = false;
            break;
          }
        }              
      }
      if (found) {
        placement.rotate = rotate;
        return placement;
      }
      if (rotate>5) {
        rotate = 0;
      }        
      if (rotate == oldRotate) {
        return null; 
      }
    }
    return placement;
  };

  gameBoard.calcField = function(tiles) {
    field = {tiles:tiles};
    var inx = 0;
    while (inx < tiles.length) {
      var placement = tiles[inx];
      if (placement.tile.blockedExits != null) {
        field.blockedExits = placement.tile.blockedExits;
      }
      field.cost = placement.tile.cost;
      field.cost = placement.tile.cost;
      field.gain = placement.tile.gain;
      field.level = placement.tile.level;
      field.smallStation = placement.tile.smallStation;
      field.bigStation = placement.tile.bigStation;
      field.connections = (placement.rotate == null ? placement.tile.connections : this.rotateConnections(placement.tile.connections,placement.rotate));
      inx ++;
    }
    return field;
  };

  gameBoard.layTile = function(placement) {
    var field = this.getField(placement.x,placement.y);
    field.tiles.push(placement);
    this.setField(placement.x,placement.y,this.calcField(field.tiles));
  };

  gameBoard.removeTile = function(placement) {
    var field = this.getField(placement.x,placement.y);
    if (field.tiles != null && field.tiles.length>0) {
      field.tiles.pop();
      this.setField(placement.x,placement.y,this.calcField(field.tiles));
    }
  };

  gameBoard.rotateConnections = function(connections, rotation) {
    if (connections == null) {
      return null;
    }
    var cl = [];
    for (var ci = 0; ci < connections.length; ++ci) {
      var cps = this.splitC(connections[ci]);
      var co = {
        start:   cps.start+rotation,
        end:     cps.end+rotation,
        station: cps.station
      };
      while (co.start > 5) {
        co.start = co.start - 6;
      }
      while (co.start < 0) {
        co.start = co.start + 6;
      }
      if (co.station == null) {
        while (co.end < 0) {
          co.end = co.end + 6;
        }
        while (co.end > 5) {
          co.end = co.end - 6;
        }
      }
      cl.push(this.joinC(co));
    }
    return cl;
  }
  
  gameBoard.makeKey = function(x,y) {
    return x + "_" + y;    
  };
  
  gameBoard.getField = function(x, y) {
    var key = this.makeKey(x,y);
    return this.fields[key];
  };

  gameBoard.setField = function(x, y, field) {
    this.fields[this.makeKey(x,y)] = field;
  };
  
  gameBoard.splitC = function(connection) {
    var parts = connection.split("_");
    var isStation = parts[1].toLowerCase().startsWith("s");
    return {
      start: parseInt(parts[0]),
      end: (isStation ? -1 : parseInt(parts[1])),
      station: (isStation ? parts[1] : null)
    };
  };

  gameBoard.joinC = function(cps) {
    var co = cps.start + "_";
    if (cps.station == null) {
      co += (cps.end < 0 ? cps.end+6 : cps.end);
    } 
    else {
      co += cps.station;
    }
    return co;
  };

  gameBoard.fields = {};
  
  gameBoard.initField = function(x, y, tile) {
    if (x<gameBoard.lowX) {
      gameBoard.lowX = x;
    }
    if (x>gameBoard.highX) {
      gameBoard.highX = x;
    }
    if (y<gameBoard.lowY) {
      gameBoard.lowY = y;
    }
    if (y>gameBoard.highY) {
      gameBoard.highY = y;
    }
    gameBoard.setField(x,y,{tiles:[]});
    gameBoard.layTile({x:x,y:y,tile:tile});
  }
  
  gameBoard.initField(1,1,{ blockedExits:[0,3,4,5]});

  gameBoard.initField(2,1,{ smallStation:1, blockedExits:[0,5]});
  gameBoard.initField(3,1,{ level: LEVEL_YELLOW, bigStation:2, blockedExits:[0,5]});
  gameBoard.initField(4,1,{ blockedExits:[0,5]});
  gameBoard.initField(5,1,{ bigStation:1, blockedExits:[0,5]});
  gameBoard.initField(6,1,{ blockedExits:[0,5]});
  gameBoard.initField(7,1,{ smallStation:1, blockedExits:[0,5]});
  gameBoard.initField(8,1,{ blockedExits:[0,5]});
  gameBoard.initField(9,1,{ bigStation:1, blockedExits:[0,5]});
  gameBoard.initField(10,1,{ smallStation:1, blockedExits:[0,1,2,5]});
    
  gameBoard.initField(1,2,{ blockedExits:[4]});
  gameBoard.initField(2,2,{ });
  gameBoard.initField(3,2,{ name:"BIRMINGHAM", bigStation:3}); 
    gameBoard.layTile({x:3,y:2, tile:{level: LEVEL_GREEN, gain: 40, connections: ["0_SA", "2_SB", "4_SC"] }});
  gameBoard.initField(4,2,{ smallStation:1});
  gameBoard.initField(5,2,{ });
  gameBoard.initField(6,2,{ });
  gameBoard.initField(7,2,{ });
  gameBoard.initField(8,2,{ });
  gameBoard.initField(9,2,{ blockedExits:[1,2]});
  

  gameBoard.initField(1,3,{ cost:20, blockedExits:[2,3,4]});
  gameBoard.initField(2,3,{ });
  gameBoard.initField(3,3,{ });
  gameBoard.initField(4,3,{ });
  gameBoard.initField(5,3,{ bigStation:1});
    gameBoard.layTile({x:5,y:3, tile:{level: LEVEL_BROWN, gain: 10, connections: ["0_S", "2_S", "4_S", "5_S"] }});
  gameBoard.initField(6,3,{ });
  gameBoard.initField(7,3,{ smallStation:1});
  gameBoard.initField(8,3,{});
  gameBoard.initField(9,3,{ smallStation:1, blockedExits:[1]});

  gameBoard.initField(1,4,{ blockedExits:[4]});
  gameBoard.initField(2,4,{ cost:20, smallStation:1});
  gameBoard.initField(3,4,{});
  gameBoard.initField(4,4,{});
  gameBoard.initField(5,4,{});
  gameBoard.initField(6,4,{});
  gameBoard.initField(7,4,{});
  gameBoard.initField(8,4,{ smallStation:1, cost:20, blockedExits:[2]});
  gameBoard.initField(9,4,{ name:"HARWICH", bigStation:1, blockedExits:[0,1,2,3]});
    gameBoard.layTile({x:9,y:4,tile:{level: LEVEL_BROWN, gain:20, connections: ["4_S"] }});
    
  gameBoard.initField(1,5,{ level: LEVEL_YELLOW, cost:20, bigStation:2, blockedExits:[3,4,5]});
  gameBoard.initField(2,5,{ name:"BRISTOL",  bigStation:1 });
    gameBoard.layTile({x:2,y:5, tile:{level: LEVEL_GREEN, cost:20, gain: 10, connections: ["1_S", "3_S"]}});
  gameBoard.initField(3,5,{});
  gameBoard.initField(4,5,{ bigStation:1});
    gameBoard.layTile({x:4,y:5, tile:{level: LEVEL_BROWN, gain: 10, connections:["1_S", "2_S", "4_S", "5_S"] }});
  gameBoard.initField(5,5,{ smallStation:1});
  gameBoard.initField(6,5,{});
  gameBoard.initField(7,5,{ name:"LONDON", bigStation:6});
    gameBoard.layTile({x:7,y:5, tile:{level:LEVEL_GREEN, gain:50, connections:["0_SA", "1_SB", "2_SC", "3_SD", "4_SE", "5_SF"]}});
  gameBoard.initField(8,5,{ bigStation:1, blockedExits:[1]});
    gameBoard.layTile({x:8,y:5, tile:{level:LEVEL_BROWN, cost:20, gain:20, connections:["0_4", "2_3", "4_S"]}});

  gameBoard.initField(1,6,{ blockedExits:[4] });
    gameBoard.layTile({x:1, y:6, tile:{ level: LEVEL_BROWN, cost:20, connections:["0_1", "0_3", "1_3"]}});
  gameBoard.initField(2,6,{ smallStation:2 });
  gameBoard.initField(3,6,{});
  gameBoard.initField(4,6,{});
  gameBoard.initField(5,6,{});
  gameBoard.initField(6,6,{ smallStation:2});
  gameBoard.initField(7,6,{});
  gameBoard.initField(8,6,{ cost:20, bigStation:1, blockedExits:["0"]});
  gameBoard.initField(9,6,{ bigStation:1, blockedExits:[0,1,2,5]});
    gameBoard.layTile({x:9,y:6, tile:{ level:LEVEL_BROWN, cost:20, gain:20, connections:["3_S", "4_S"]}});

  gameBoard.initField(1,7,{ blockedExits:[3,4,5]});
  gameBoard.initField(2,7,{});
  gameBoard.initField(3,7,{});
  gameBoard.initField(4,7,{ bigStation:1, blockedExits: [2]});
  gameBoard.initField(5,7,{ level: LEVEL_YELLOW, bigStation:2, blockedExits:[3]});
  gameBoard.initField(6,7,{ smallStation:1, blockedExits:[2,3] });
  gameBoard.initField(7,7,{ bigStation:1});
  gameBoard.initField(8,7,{ smallStation:1, cost:20, blockedExits:[2]});
  gameBoard.initField(9,7,{ cost:20, blockedExits:[1,2,3]});

  gameBoard.initField(1,8,{ cost:20, blockedExits:[2,3,4]});
  gameBoard.initField(2,8,{ cost:20, smallStation:1, blockedExits:[2,3]});
  gameBoard.initField(3,8,{ bigStation:1, blockedExits:[1,2,3]});
    gameBoard.layTile({x:3,y:8, tile:{ level: LEVEL_BROWN, cost:20, gain:20, connections:["0_S", "4_S", "5_S"]}});
  gameBoard.initField(5,8,{ blockedExits:[2,3,4]});
    gameBoard.layTile({x:5,y:8, tile:{level: LEVEL_BROWN, cost:20, connections:["0_5"]}});
  gameBoard.initField(6,8,{ blockedExits:[2,3,4]});
    gameBoard.layTile({x:6,y:8, tile:{level: LEVEL_BROWN, cost:20, connections:["0_5"]}});
