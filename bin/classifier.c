#include <math.h>

int classifier(double *x){

	int CLASS = 0;

	if(!(x[4]<x[23]||x[2]<((x[13]/(((-0.84)/x[20])*((x[4]+x[13])*(((x[18]/(-50.9))+(-30.766))*(x[12]-x[13])))))/x[24]))) CLASS=0;
	else CLASS=1;
	
	return CLASS;
}
