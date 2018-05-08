from django.db import models

class Peer(models.Model):
    email = models.CharField(max_length=200)
    rtc_id = models.CharField(max_length=10000000000000000000000000000000000000000000)
