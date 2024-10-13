#include <math.h>

int classifier(double *x){

	int CLASS = 0;

	if(!(x[4]<x[23]&&!(x[20]<((x[26]+(-12.4))/(x[0]/((x[23]+x[22])*x[20])))&&x[17]<(-22.31)&&x[19]>=(x[10]+((((-7.0)/x[24])/((x[0]*x[33])+x[32]))-(-6.9)))))) CLASS=0;
	else CLASS=1;
	
	return CLASS;
}
