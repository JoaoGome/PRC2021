<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xd="http://www.oxygenxml.com/ns/doc/xsl"
    exclude-result-prefixes="xd"
    version="2.0">
    
    <xsl:output method="text" encoding="UTF-8" indent="yes"/>
    
    <!-- TEMPLATE PRINCIPAL .............. -->
    <xsl:template match="/">
        <xsl:result-document href="afterTemplate.txt">
            <xsl:apply-templates mode="inicial" select="/"/>
            <xsl:apply-templates mode="instrumento" select="//instrumentos"></xsl:apply-templates>
            <xsl:apply-templates mode="partitura" select="//partitura"></xsl:apply-templates>
        </xsl:result-document>
    </xsl:template>
    
    <!-- TEMPLATE REFERENTE À OBRA............ -->
    <xsl:template match="obra" mode="inicial">
        
        <xsl:if test="compositor">
        ###  http://www.di.uminho.pt/prc2021/tpc2#<xsl:value-of select="translate(translate(compositor, ' ',''), ',','_')"/>
        :<xsl:value-of select="translate(translate(compositor, ' ',''), ',','_')"/> rdf:type owl:NamedIndividual ,
        :compositor ;
        :compos :<xsl:value-of select="@id"/> .    
        </xsl:if>
        
        
        ###  http://www.di.uminho.pt/prc2021/tpc2#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :obra ;
        <xsl:if test="instrumentos">
        <xsl:apply-templates mode="obra" select="instrumentos"/></xsl:if>  
        <xsl:if test="titulo">
        :titulo "<xsl:value-of select="titulo"/>"</xsl:if>    
        <xsl:if test="tipo"> ;
        :tipo "<xsl:value-of select="tipo"/>"</xsl:if>
        <xsl:if test="arranjo"> ;
        :arranjo "<xsl:value-of select="arranjo"/>"</xsl:if>
        <xsl:if test="subtitulo"> ;
        :subtitulo "<xsl:value-of select="subtitulo"/>"</xsl:if>
        <xsl:if test="inf-relacionada/video"> ;
        :video "<xsl:value-of select="inf-relacionada/video/@href"/>"</xsl:if> 
        <xsl:if test="compositor"> ;
        :compostaPor :<xsl:value-of select="translate(translate(compositor, ' ',''), ',','_')"/> </xsl:if>  .   
    </xsl:template>
    
    
    <!-- TEMPLATE REFERENTE AO INSTRUMENTO............ -->
    <xsl:template match="instrumento" mode="instrumento">
        ###  http://www.di.uminho.pt/prc2021/tpc2#<xsl:value-of select="generate-id()"/>
        :<xsl:value-of select="generate-id()"/> rdf:type owl:NamedIndividual ,
        :instrumento ;
        <xsl:if test="partitura">
        <xsl:apply-templates mode="Instrum" select="partitura"></xsl:apply-templates></xsl:if>
        <xsl:if test="designacao">
        :designação "<xsl:value-of select="designacao"/>" .</xsl:if>
    </xsl:template> 
    
    <!-- TEMPLATE REFERENTE À PARITITURA............ -->
    <xsl:template match="partitura" mode="partitura">
        ###  http://www.di.uminho.pt/prc2021/tpc2#<xsl:value-of select="generate-id()"/>
        :<xsl:value-of select="generate-id()"/> rdf:type owl:NamedIndividual ,
        :partitura ;
        :type "<xsl:value-of select="@type"/>" ;
        :path "<xsl:value-of select="@path"/>"
        <xsl:if test="@voz"> ;
        :voz "<xsl:value-of select="@voz"/>"</xsl:if>
        <xsl:if test="@afinacao"> ;
        :afinacao "<xsl:value-of select="@afinacao"/>"</xsl:if>
        <xsl:if test="@clave"> ;
        :clave "<xsl:value-of select="@clave"/>"</xsl:if> .
        
    </xsl:template> 
    
    <!-- TEMPLATES AUXILIARES............. -->
    <xsl:template match="instrumento" mode="obra">:temInstrumento :<xsl:value-of select="generate-id()"/> ;</xsl:template>
    
    <xsl:template match="partitura" mode="Instrum">:temPartitura :<xsl:value-of select="generate-id()"/> ;</xsl:template>
</xsl:stylesheet>

