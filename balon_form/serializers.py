from rest_framework import serializers
from .models import Balon

class BalonsSerializer(serializers.Serializer):
    balon_num = serializers.CharField(max_length=150)
    balon_status = serializers.CharField(max_length=150)
    balon_state = serializers.CharField(max_length=150)
    date = serializers.DateField()

    def create(self, validated_data):
        return Balon.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.balon_num = validated_data.get('balon_num', instance.balon_num)
        instance.balon_status = validated_data.get('balon_status', instance.balon_status)
        instance.balon_state = validated_data.get('balon_state', instance.balon_state)
        instance.date = validated_data.get('date', instance.date)

        instance.save()
        return instance
        