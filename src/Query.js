class Query
{

    constructor(activityDataSet)
    {

        this.activityDataSet = activityDataSet;
        this.resultSet = new ResultSet();
        
    }
    linkDataSet(activityDataSet)
    {
        this.activityDataSet= activityDataSet; 
    }
    
}
