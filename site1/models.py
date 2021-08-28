from django.db import models
from django.contrib.postgres.fields import ArrayField

class Data(models.Model):


	units = ArrayField(
		ArrayField(models.FloatField())
		)
	volts = ArrayField(
		ArrayField(models.FloatField())
		)
	freqs = ArrayField(
		ArrayField(models.FloatField())
		)
	mags = ArrayField(
		ArrayField(models.FloatField())
		)


