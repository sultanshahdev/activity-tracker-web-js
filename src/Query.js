class Query
{
    activityDataSet = null;

    constructor()
    {
        this.resultSet = new ResultSet();
        
    }
    linkDataSet(activityDataSet)
    {
        this.activityDataSet= activityDataSet; 
    }
    
}
