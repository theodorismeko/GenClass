#include <math.h>

int classifier(double *x){

	int CLASS = 0;

	if(!(x[4]<=x[20]&&x[21]<=(((((((-44.79)/x[0])-(((-934.2)/((x[22]*(-669.7))*x[8]))*(x[5]/x[32])))/(x[22]*x[23]+x[2]))/x[20])+(-1.415))-x[26]))) CLASS=0;
	else CLASS=1;
	
	return CLASS;
}
