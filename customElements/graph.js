xtag.register('x-graph', {
    lifecycle:{
        inserted: function(){
        
            var graph = document.createElement('div');
            var legend = document.createElement('div');

            //inject wrappers
            graph.setAttribute('id', this.id + 'Graph');
            this.appendChild(graph);
            legend.setAttribute('id', this.id + 'Legend');
            this.appendChild(legend);

            //listen for data update events
            this.addEventListener('updateDyData', this.updateData, false);

            //listen for series on/off events
            this.addEventListener(
                'setDyVisible', 
                function(event){
                    this.setVisible(event.detail.index, event.detail.isVisible)
                }.bind(this), 
                false
            );

            this.configure();
        }
    },

    methods:{
        configure: function(){
            this.initializePlot(dataStore.plotInitData, dataStore.plotStyle);
        },

        initializePlot: function(data, style){
            //set up a new plot.
            //<data>: array; data for dygraph configured appropriately: [[x0, y00, y01, ..., y0n,], [x1, y10, y11, ..., y1n], ...]
            //<style>: object; styling object for dygraphs
            //this: x-graph object

            this.dygraph = new Dygraph(
                document.getElementById(this.id + 'Graph'),
                data,
                style
            );
        },

        updateData: function(event){
            //catch an event carrying new data, and update.
            //<event>: event; updateDyData custom event
            //this: x-graph object

            var keys, i, annotations;

            this.dygraph.updateOptions( { 'file': event.detail.data } );

            //check for annotations to add
            //update annotations
            if(dataStore.annotations){
            keys = Object.keys(dataStore.annotations)
                if(keys.length > 0 ){
                    annotations = this.dygraph.annotations()
                    for(i=0; i<keys.length; i++){
                        //mark up annotation with the right time
                        dataStore.annotations[keys[i]].x = event.detail.data[event.detail.data.length-1][0].getTime();
                        //add to list
                        annotations.push(dataStore.annotations[keys[i]]);
                    }
                    //set annotations on dygraph and dump the annotation buffer
                    this.dygraph.setAnnotations(annotations)
                    dataStore.annotations = {};
                }
            }

        },

        setVisible: function(index, isVisible){
            //set visibility of series in this.dygraph
            //<index>: number; index of series to set visibility on
            //<isFisible>: bool; true -> data series at <index> is visible
            //this: x-graph object

            this.dygraph.setVisibility(index, isVisible);
        }
    }

});