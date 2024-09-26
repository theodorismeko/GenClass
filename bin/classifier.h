#include <math.h>

int classifier(double *x){

	int CLASS = 0;

	if(!(x[2]<x[15]&&x[32]>=(((x[8]*((-0.24)/x[0]))/x[8])/x[20])||x[6]<(x[28]/(((-1.09)*(-24.259)*x[14])*(x[15]+x[4]))))) CLASS=0;
	else CLASS=1;
	
	return CLASS;
}
