////////////////////////////////////////////
// main setup
////////////////////////////////////////////

function setupDataStore(){
    var i,j,k
    var griffinCodes = []
    var mdppCodes = []


    //generate 8pi detector nomenclature codes
    for(i=0; i<16; i++){
        griffinCodes.push('grif16_' + i);
    }

    for(i=0; i<16; i++){
        mdppCodes.push('mdpp16_' + i);
    }

    //declare top level groups
    var topGroups = [
        {
            "name": "Hit Patterns & Sums",
            "id": "hitsAndSums",
            "color": '#367FA9',
            "subGroups": [
                {
                    "subname": "Hit Patterns",
                    "id": "hits",
                    "items": [
                        'HITPATTERN_Energy',
                        'HITPATTERN_Time',
                        'HITPATTERN_Waveform',
                        'HITPATTERN_Pulse_Height',
                        'HITPATTERN_Rate'
                    ]
                },
                {
                    "subname": "Sum Spectra",
                    "id": "sums",
                    "items": [
                        'SUM_Singles_Low_gain_Energy',
                        'SUM_Singles_High_gain_Energy',
                        'SUM_Addback_Energy',
                        'SUM_PACES_Energy',
                        'SUM_LaBr3_Energy'
                    ]
                }
            ]
        },

        {
            "name": "8PI",
            "id": "8PI",
            "color": '#367FA9',
            "subGroups": [
                {
                    "subname": "Energy",
                    "id": "GRGenergy",
                    "items": griffinCodes.map(function(c){return c + '_Energy'})
                },
                {
                    "subname": "Time",
                    "id": "GRGtime",
                    "items": griffinCodes.map(function(c){return c + '_Time'})
                },
                {
                    "subname": "Pulse Height",
                    "id": "GRGpulseHeight",
                    "items": griffinCodes.map(function(c){return c + '_Pulse_Height'})
                },
                {
                    "subname": "Waveform",
                    "id": "GRGwaveform",
                    "items": griffinCodes.map(function(c){return c + '_Waveform'})
                }
            ]
        },
                {
            "name": "MDPP16",
            "id": "MDPP16",
            "color": '#367FA9',
            "subGroups": [
                {
                    "subname": "Energy",
                    "id": "MDPPenergy",
                    "items": mdppCodes.map(function(c){return c + '_Energy'})
                },
                {
                    "subname": "Time",
                    "id": "MDPPtime",
                    "items": mdppCodes.map(function(c){return c + '_Time'})
                },
                {
                    "subname": "Pulse Height",
                    "id": "MDPPpulseHeight",
                    "items": mdppCodes.map(function(c){return c + '_Pulse_Height'})
                },
                {
                    "subname": "Waveform",
                    "id": "MDPPwaveform",
                    "items": mdppCodes.map(function(c){return c + '_Waveform'})
                }
            ]
        }
    ]

    dataStore = {
        "pageTitle": 'Spectrum Viewer',                             //header title
        "topGroups": topGroups,                                     //groups in top nav row
        "waveformSnap": true,                                       //do we want the snap to waveform functionality?
        "doUpdates": true,                                          //do we want the data update button and loop?
        "scaling": false,                                           //do we want to expose x-axis rescaling UI?
        "plots": [],                                                //array of names for default plot cells
        "spectrumServer": 'http://titan05.triumf.ca:9093',         //analyzer url + port
        "ODBrequests": [],                                          //array of odb requests to make on refresh
        "zeroedPlots": {}                                           //initialize empty object for zeroed plots
    }
    dataStore.cellIndex = dataStore.plots.length;

}
setupDataStore();


/////////////////
// helpers
/////////////////

function fetchCallback(){
    //fires after all data has been updated

    var i,
        keys = Object.keys(dataStore.viewers);

    for(i=0; i<keys.length; i++){
        dataStore.viewers[keys[i]].plotData(null, true);
    }
}
